/**
 * Auto-Translate Library for Opera 11 Extensions.
 * ------------------------------------------------
 * Written by Rich Tibbett.
 * Distributed under the Creative Commons Sharealike License:
 *   http://creativecommons.org/licenses/by-sa/2.5/
 * 
 * This library will take all input strings from messages.js and convert your extension 
 * in to the user's current language via the Google Translate API.
 * 
 * All translations are cached to speed up localization delivery and prevent unnecessary 
 * translation lookups.
 * 
 * For full usage instructions please consult the README file or visit the support page:
 * 
 * http://my.opera.com/richtr/blog/experimental-auto-internationalization-i18n-library-for-opera-11-extension-dev
 * 
 */
!function( undefined ) {

	// var userLanguage = 'ja', // for testing (comment out other userLanguage parameter below)
	var userLanguage = window.navigator.language, // production (comment out other userLanguage parameter above)
		oex = opera.extension,
	    storage = localStorage,
        initialized = false,
	    origMessages = cloneObj( oex.messages ) || [],
	    sanitizedMessages = oex.messages || [];
	
	for( var i in sanitizedMessages ) {
		sanitizedMessages[i]["message"] = decodeLiterals( sanitizedMessages[i]["message"] ) || '';
	}

	if(!storage[ userLanguage ]) storage[ userLanguage ] = {};

	function cloneObj(o) {
     		if(typeof(o) != 'object') return o;
     		if(o == null) return o;
     		var newO = new Object();
     		for(var i in o) newO[i] = cloneObj(o[i]);
      		return newO;
	}

	var xhrManager = ( function() {
		var pool = [];
		return {
			get: function () {
				return pool.pop() || new XMLHttpRequest();
			},
			release: function( xhr ) {
				xhr.onreadystatechange = function () {};
				pool.push( xhr );
			}
		};
	}() );

	function getAnalysisUrl ( strings ) {
		var url = 'https://ajax.googleapis.com/ajax/services/language/detect?v=1.0&q=',
			text = '';

		for(var i in strings) {
			if(text !== '') text += ' ';
			text += strings[i];
		}
		text = encodeURIComponent( text );
		if ( text.length > 1300 ) {
			text = text.slice( 0, text.lastIndexOf( '%', 1300 ) );
		}
		url += text;
		return url;
	}

	function getTranslatePackets ( fromLanguage, strings ) {
		var packets = [],
			i = 0,
			s = [],
			l = 0;

		for(var x in strings) {
			s[l] = strings[x];
			l++;
		}

		while ( i < l ) {
			// Set destination language
			var packet = 'v=1.0&langpair=' + fromLanguage + '%7C' + userLanguage,
				len = packet.length;

			//for(var i in strings) {
			for ( var segments = 0;
			i < l && segments < 100; i += 1, segments += 1 ) {
				var next = encodeLiterals( s[i] ),
				nextLen = next.length;
				// If the text is too long, abort.
				if ( nextLen > 4900 ) {
					return [];
				}
				// Google Translate requests have a 5000 character limit.
				if ( len + nextLen > 4900 ) {
					break;
				}
				packet += '&q=';
				packet += next;
				len += nextLen;
			}
			packets.push( packet );
		}
		return packets;
	}

	// Before we analyze check if we already have the translations
	function getCached ( messages ) {
		var cachedStrs = [],
			isCached = true;
		for( var i in messages ) {
			var origStr = storage.getItem( encodeURIComponent( "autolang_orig_" + i ) );
			var cacheStr = storage.getItem( encodeURIComponent( "autolang_" + userLanguage + "_" + i ) );
			if( origStr && origStr == messages[i]["message"] && cacheStr ) {
				cachedStrs[ i ] = cacheStr;
			} else {
				flushCache(); // Flush the cache!
				isCached = false;
				break;
			}
		}
		return isCached ? cachedStrs : null;
	}

	function flushCache () {
		// Only remove autolang_ storage attributes
		for(var j = 0, l = storage.length; j < l; j++) {
			var key = decodeURIComponent( storage.key( j ) );
			if(key.indexOf("autolang_" + userLanguage) === 0)
				storage.removeItem( key );
		}
	}

	function encodeLiterals( string ) {
		if( string && typeof string == 'string' ) {
			var regex = /(<[^\!\+>]*\!>)/gm;
			var matches = string.match( regex );
			if( matches ) {
				for(var i in matches) {
					var replacement = matches[ i ].replace( / /gm, "__" );
					string = string.replace( matches[ i ], replacement );
				}
			}
		}
		return encodeURIComponent( string );
	}
	function decodeLiterals( string ) {
		if( string && typeof string == 'string' ) {
			var regex = /<([^\!\+>]*)\!>/gm,
			string = string.replace( regex, "$1" ); 
			string = string.replace( /__/gm, " " ); 
		}
		return string;
	}

	function analyze ( strings, callback ) {
		var xhr = xhrManager.get();
		xhr.open( 'GET', getAnalysisUrl( strings ), true );
		xhr.onreadystatechange = function () {
			if ( xhr.readyState < 4 ) return;
			var result = JSON.parse( xhr.responseText ),
			data = result.responseData;
			if ( ( xhr.status >= 200 && xhr.status < 300 ) &&
					( result.responseStatus === 200 ) ) {
				callback( data.language );
			} else {
				callback( ); // no parameter indicates an error
			}
			xhrManager.release( xhr );
		};
		try {
			xhr.send();
		} catch(e) {
			callback( ); // offline
		}
	}

	function translate ( fromLanguage, strings, callback ) {
		if( fromLanguage === userLanguage ) {
			callback( strings );
			return;
		}

		var xhr = xhrManager.get(),
			packets = getTranslatePackets( fromLanguage, strings ),
			l = packets.length,
			i = 0,
			translatedStringData = [];

		function send () {
			xhr.open( 'POST', 'https://ajax.googleapis.com/ajax/services/language/translate',
					true );
			xhr.setRequestHeader( 'Content-type', 
			'application/x-www-form-urlencoded' );
			xhr.send( packets[i] );
		}

		xhr.onreadystatechange = function () {
			if ( xhr.readyState < 4 ) return;
			var result = JSON.parse( xhr.responseText ),
			data = result.responseData;

			if ( ( xhr.status >= 200 && xhr.status < 300 ) &&
					result.responseStatus === 200 ) {
				if ( !( data instanceof Array ) ) {
					data = [ data ];
				}
				Array.prototype.push.apply( translatedStringData, data.map(
						function( item ) {
							return item.responseStatus === 200 ? 
									item.responseData.translatedText : null;
						}
				) );
				i += 1;
				if ( i < l ) {
					send();
				} else {
					callback( translatedStringData );
					xhrManager.release( xhr );
				}
			} else {
				callback( strings );
				xhrManager.release( xhr );
			}
		};
		send();
	}
	
	function loadLocaleData ( callback ) {
		var strings = [],
			l = 0;
		
		if( origMessages.length <= 0 ) {
			fail( callback, null, [] );
			return;
		}
	
		for(var i in origMessages) { 
			strings[l] = origMessages[i]["message"];
			storage.setItem(encodeURIComponent("autolang_orig_" + i), strings[l]);
			l++;
		}
	
		var cached = getCached( origMessages );
	
		if( cached ) {
			for(var i in origMessages) {
				sanitizedMessages[i]["message"] = decodeLiterals(
						cached[i]) || decodeLiterals(sanitizedMessages[i]["message"] 
				);
			}
			opera.postError('Loaded from cache!');
			callback( userLanguage, sanitizedMessages );
			return;
		}
	
		analyze( strings, function( language ) {
			if( language ) {
				translate( language, strings, function( translatedStringData ) {
					var count = 0;
					for(var i in origMessages) {
						storage.setItem(encodeURIComponent("autolang_" + userLanguage + "_" + i), 
								translatedStringData[ count ]);
						sanitizedMessages[i]["message"] = decodeLiterals( translatedStringData[ count++ ] );
					}
					callback( language, sanitizedMessages );
				});
			} else {
				fail( callback, null, sanitizedMessages );
			}
		});
	}

	function fail ( callbackOrSource, id, stringData ) {
		for(var i in stringData) {
			stringData[i]["message"] = decodeLiterals(stringData[i]["message"]) || '';
		}
		if( typeof callbackOrSource == 'function' ) {
			callbackOrSource( userLanguage, stringData );
		} else {
			callbackOrSource.postMessage({
				action: 'i18n_localized',
				"id": id || null,
				"language": userLanguage,
				"data": stringData
			});
		}
	}

	var actions = {
			i18n_load: function( data, source, callback ) {
				if( source ) {
					source.postMessage({
						action: 'i18n_localized',
						"data": sanitizedMessages,
						"language": (initialized ? userLanguage : null)
					});
				} else if ( callback ) {
					callback( ( initialized ? userLanguage : null ), sanitizedMessages );
				}
			},
			i18n_localize: function( data, source, callback ) {
				var id = data.id,
				messages = data.messages || null,
				strings = [];

				if( !messages ) {
					fail( source || callback, id, {} );
					return;
				}

				var l = 0;
				for(var i in messages) { 
					strings[l] = messages[i]["message"];
					storage.setItem(encodeURIComponent("autolang_orig_" + i), strings[l]);
					l++;
				}

				var cached = getCached( messages );

				if( cached ) {
					for(var i in messages)
						messages[i]["message"] = decodeLiterals(cached[i]) || 
						decodeLiterals(messages[i]["message"]);

					if( source ) {
						source.postMessage({
							action: 'i18n_localized',
							"id": id || null,
							"language": userLanguage,
							"data": messages
						});
					} else if (callback) {
						callback( userLanguage, messages );
					}
					return;
				}

				analyze( strings, function( language ) {
					if( language ) {
						translate( language, strings, function( translatedStringData ) {
							var count = 0;
							for(var i in messages) {
								storage.setItem(encodeURIComponent("autolang_" + userLanguage + "_" + i), 
										translatedStringData[ count ]);
								messages[i]["message"] = decodeLiterals(translatedStringData[ count++ ]);
							}
							if( source ) {
								source.postMessage({
									action: 'i18n_localized',
									"id": id || null,
									"language": language,
									"data": messages
								});
							} else if (callback) {
								callback( language, messages );
							}
						});
					} else {
						fail( source || callback, id, messages );
					}
				});
			}
	};

	oex.addEventListener( 'message', function( msg ) {
		if( msg.data.action !== 'i18n_load' && 
				msg.data.action !== 'i18n_localize' )
			return;
		actions[ msg.data.action ]( msg.data, msg.source );
	}, false);


//	Load the i18n library and provide the API @ opera.extension.i18n

	var i18nObj = function() {
		var lang = 'en',
			readyTransactions = [];
		function _loadedCB ( language, messages ) {
			var s = [];
			for(var j in messages) {
				s[j] = oex.messages[j] = messages[j];
			}
			if(!initialized){ // after 'quickLoad'
				if( language ) {
					initialized = true;
					lang = language;
					for(var i = 0, l = readyTransactions.length; i < l; i++) {
						readyTransactions[ i ]( lang );
						readyTransactions = readyTransactions.splice(i, 1);
					}
				} else {
					loadLocaleData( _loadedCB );
				}
			}
		}
		var _l = function( stringData, callback ) {
			if( !stringData )	{ // no data :(
				if( callback && typeof callback == 'function' )	callback( lang, stringData );
				return; 
			}
			actions[ 'i18n_localize' ]({ "messages": stringData }, null, cb);
		};
		var _r = function( callback ) {
			var cb = (callback && typeof callback == 'function') ? callback : function() {};
			initialized ? callback( lang ) : readyTransactions.push( cb );
		};
		var _gm = function( id, replacements ) {
			if( !oex.messages[ id ]) return id;
			var s = oex.messages[ id ][ "message" ];
			if(replacements)
				for(var i in replacements) s = s.replace('<string/>', replacements[i] );
			return unescape(s);
		};
		actions[ 'i18n_load' ]( {}, null, _loadedCB );
		return {
			get ready() { return _r; }, 	 // parameters: (callback_function)
			get localize() { return _l; },   // parameters: (strings, callback_function)
			get getMessage() { return _gm; } // parameters: (message_id[, replacements])
		};
	};
	if(!oex.i18n) oex.i18n = new i18nObj();

}();
