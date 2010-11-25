( function() {

var destLang = localStorage.getItem( 'lang' ) || 'en';

var languages = {
    'af':'Afrikaans',
    'sq':'Albanian',
    'am':'Amharic',
    'ar':'Arabic',
    'hy':'Armenian',
    'az':'Azerbaijani',
    'eu':'Basque',
    'be':'Belarusian',
    'bn':'Bengali',
    'bh':'Bihari',
    'br':'Breton',
    'bg':'Bulgarian',
    'my':'Burmese',
    'ca':'Catalan',
    'chr':'Cherokee',
    'zh':'Chinese',
    'zh-CN':'Chinese Simplified',
    'zh-TW':'Chinese Traditional',
    'co':'Corsican',
    'hr':'Croatian',
    'cs':'Czech',
    'da':'Danish',
    'dv':'Dhivehi',
    'nl':'Dutch',
    'en':'English',
    'eo':'Esperanto',
    'et':'Estonian',
    'fo':'Faroese',
    'tl':'Filipino',
    'fi':'Finnish',
    'fr':'French',
    'fy':'Frisian',
    'gl':'Galician',
    'ka':'Georgian',
    'de':'German',
    'el':'Greek',
    'gu':'Gujarati',
    'ht':'Haitian Creole',
    'iw':'Hebrew',
    'hi':'Hindi',
    'hu':'Hungarian',
    'is':'Icelandic',
    'id':'Indonesian',
    'iu':'Inuktitut',
    'ga':'Irish',
    'it':'Italian',
    'ja':'Japanese',
    'jw':'Javanese',
    'kn':'Kannada',
    'kk':'Kazakh',
    'km':'Khmer',
    'ko':'Korean',
    'ku':'Kurdish',
    'ky':'Kyrgyz',
    'lo':'Lao',
    'la':'Latin',
    'lv':'Latvian',
    'lt':'Lithuanian',
    'lb':'Luxembourgish',
    'mk':'Macedonian',
    'ms':'Malay',
    'ml':'Malayalam',
    'mt':'Maltese',
    'mi':'Maori',
    'mr':'Marathi',
    'mn':'Mongolian',
    'ne':'Nepali',
    'no':'Norwegian',
    'oc':'Occitan',
    'or':'Oriya',
    'ps':'Pashto',
    'fa':'Persian',
    'pl':'Polish',
    'pt':'Portuguese',
    'pt-PT':'Portuguese (Portugal)',
    'pa':'Punjabi',
    'qu':'Quechua',
    'ro':'Romanian',
    'ru':'Russian',
    'sa':'Sanskrit',
    'gd':'Scots Gaelic',
    'sr':'Serbian',
    'sd':'Sindhi',
    'si':'Sinhalese',
    'sk':'Slovak',
    'sl':'Slovenian',
    'es':'Spanish',
    'su':'Sundanese',
    'sw':'Swahili',
    'sv':'Swedish',
    'syr':'Syriac',
    'tg':'Tajik',
    'ta':'Tamil',
    'tt':'Tatar',
    'te':'Telugu',
    'th':'Thai',
    'bo':'Tibetan',
    'to':'Tonga',
    'tr':'Turkish',
    'uk':'Ukrainian',
    'ur':'Urdu',
    'uz':'Uzbek',
    'ug':'Uighur',
    'vi':'Vietnamese',
    'cy':'Welsh',
    'yi':'Yiddish',
    'yo':'Yoruba',
    '':'Unknown'
};

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

function getAnalysisUrl ( text ) {
    var url = 
            'http://ajax.googleapis.com/ajax/services/language/detect?v=1.0&q=';
    text = encodeURIComponent( text );
    if ( text.length > 1300 ) {
        text = text.slice( 0, text.lastIndexOf( '%', 1300 ) );
    }
    url += text;
    
    return url;
}

function getTranslatePackets ( strings, from, to ) {
    var packets = [],
        i = 0,
        l = strings.length;
    while ( i < l ) {
        // Set destination language
        var packet = 'v=1.0&langpair=' + from + '%7C' + to;
        var len = packet.length;

        for ( var segments = 0;
                i < l && segments < 100; i += 1, segments += 1 ) {
            var next = encodeURIComponent( strings[i] ),
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

var actions = {
    setHomeLanguage: function( lang, source ) {
        destLang = lang;
        localStorage.setItem( 'lang', lang );
    },
    analyse: function ( text, source ) {
        var xhr = xhrManager.get();
        xhr.open( 'GET', getAnalysisUrl( text ), true );
        xhr.onreadystatechange = function () {
            if ( xhr.readyState < 4 ) return;
            var result = JSON.parse( xhr.responseText ),
                data = result.responseData;
            if ( ( xhr.status >= 200 && xhr.status < 300 ) &&
                    ( result.responseStatus === 200 ) ) {
                var language = data.language;
                if ( language !== destLang ) {
                    source.postMessage({
                        action: 'showMessage',
                        data: {
                            homeLang: destLang,
                            language: languages[ language ],
                            langCode: language
                        }
                    });
                } else {
                    source.postMessage({
                        action: 'inNativeLanguage'
                    });
                }
            } else {
                source.postMessage({
                    action: 'analysisFailed'
                });
            }
            xhrManager.release( xhr );
        };
        xhr.send();
    },
    translate: function ( data, source ) {
        var xhr = xhrManager.get(),
            strings = data.strings,
            from = data.fromLang,
            packets = getTranslatePackets( strings, from, destLang ),
            l = packets.length,
            i = 0,
            translatedStrings = [];
        
        function send () {
            xhr.open( 'POST', 
              'http://ajax.googleapis.com/ajax/services/language/translate',
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
                Array.prototype.push.apply( translatedStrings, data.map(
                    function( item ) {
                        return item.responseStatus === 200 ? 
                            item.responseData.translatedText : null;
                    }
                ) );
                i += 1;
                if ( i < l ) {
                    setTimeout( send, 0);
                } else {
                    source.postMessage({
                        action: 'translate',
                        data: translatedStrings
                    });
                    xhrManager.release( xhr );
                }
            } else {
                source.postMessage({
                    action: 'translationFailed'
                });
                xhrManager.release( xhr );
            }
        };
        send();
    }
};

window.addEventListener( 'load', function () {
    opera.extension.addEventListener( 'message', function ( msg ) {
        actions[ msg.data.action ]( msg.data.data, msg.source );
    }, false );
}, false);

}() );