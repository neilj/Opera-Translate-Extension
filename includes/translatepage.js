// ==UserScript==
// @include http://*
// ==/UserScript==

/*global window, document, opera */

( function() {
    
if ( window.location !== window.parent.location ) {
    return;
}
    
var btnGrad = 'data:image/png;base64,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';

var attributeNameMap = {
    'className': 'className',
    'for': 'htmlFor',
    html: 'innerHTML',
    text: 'textContent'
};
    
var Element = {

    create: function ( tag, props, children ) {
        var el = document.createElement( tag );
        if ( props ) {
            Element.setAttributes( el, props );
        }
        if ( children ) {
            for ( var i = 0, l = children.length; i < l; i += 1 ) {
                el.appendChild( children[i] );
            }
        }
        return el;
    },

    setAttributes: function ( el, props ) {
        for ( var prop in props ) {
            if ( props.hasOwnProperty( prop ) ) {
                var name = attributeNameMap[ prop ],
                    value = props[ prop ];
                if ( value ) {
                    if ( name ) {
                        el[ name ] = value;
                    } else {
                        el.setAttribute( prop, value );
                    }
                }
            }
        }
    }
};



window.addEventListener( 'DOMContentLoaded', function () {

// An iterator that returns all text nodes which do not just
// contain white space and are not a child of style or script elements.
function getIterator () {
    var NodeFilter = window.NodeFilter,
        Node = window.Node,
        body = document.body;
    return document.createNodeIterator( body, NodeFilter.SHOW_TEXT, {
        acceptNode: function ( node ) {
            if ( /^\s*$/.test( node.textContent ) ||
                    node.parentNode.nodeType !== Node.ELEMENT_NODE ) {
                return NodeFilter.FILTER_REJECT;
            }
            while ( ( node = node.parentNode ) !== body ) {
                var tag = node.nodeName;
                if ( tag === 'SCRIPT' || tag === 'STYLE' ) {
                    return NodeFilter.FILTER_REJECT;
                }
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    }, false );
}
    
// 2. Check the language of the page.
( function() {
	
    var text = '';
	
	function getContent(type) {
		var els = document.querySelectorAll( type ),
			eltext;
		for ( var i = 0, l = els.length; i < l; i += 1 ) {
	        if ( i ) { text += ' '; }
	        eltext = els[i].textContent.replace(/\s\s*/g, ' ').trim();
	        text += eltext;
	        if ( text.length > 800 ) { break; }
	    }
	}

	getContent( 'p' );
	if( text.length < 400 ) {
		getContent( 'h1, h2, h3, a' );
	}
    if ( text.length < 400 ) {
        text = document.body.textContent
            .replace(/\s\s*/g, ' ')
            .slice( 0, 800 );
    }
    opera.extension.postMessage({
        action: 'analyse',
        data: text.slice( 0, 800 )
    });
}() );

var strings = [],
    contentHasChanged = false,
    div,
    label,
    translateButton,
    revertButton,
    closeButton,
    optionsSelect,
    keyTriggers = {ctrl:false,shift:false};
    
function cleanup () {}
    
function hideMessage () {
    div.addEventListener( 'oTransitionEnd', function() {
        document.body.removeChild( div );
        div.removed = true;
    }, true);
    div.style.top = '-34px';
    document.body.style.top = '0';
}

function showMessage ( data ) {
    
    // Collect strings before we modify the DOM
    ( function() {
        var textnode,
            iterator = getIterator();
        while ( ( textnode = iterator.nextNode() ) ) {
            strings.push( textnode.textContent );
        }
        iterator.detach();
    }() );
         
    div = Element.create( 'div', {
        style: 'color: #000; position: fixed; height: 24px; top: -34px; left: 0; right: 0; padding: 5px 10px; background: #CACDD5; color: #000; border-bottom: 1px solid #000; z-index: 20000; font: 12px/20px "Lucida Grande", Arial, sans-serif; text-align: left; -o-transition: top 0.3s ease-in-out;'
    }, [
        label = Element.create( 'span', {
            style: 'padding: 0; margin: 0 8px 0 0;',
            text: 'This page appears to be written in ' + data.language + '.'
        }),
    
        translateButton = Element.create( 'button', {
            text: 'Translate',
            style: 'padding: 1px 5px; margin: 0 8px 0 0; border: 1px solid #888; border-radius: 5px; background: #eee url(' + btnGrad + ') repeat-x; display: inline; text-shadow: 1px 1px 1px #ddd;'
        }),
        revertButton = Element.create( 'button', {
            text: 'Nope',
            style: 'padding: 1px 5px; margin-right: 0 8px 0 0; border: 1px solid #888; border-radius: 5px; background: #eee url(' + btnGrad + ') repeat-x; display: inline; text-shadow: 1px 1px 1px #ddd;'
        }),
        optionsSelect = Element.create( 'select', {
            style:
                'position: absolute; right: 36px; top: 6px; padding: 2px 0;'
        }, [
            Element.create( 'option', {
                text: 'Always translate ' + data.language,
                style: 'padding: 2px 0;',
                value: 'always',
                selected: data.preference === 'always' ? 'selected' : null
            }),
            Element.create( 'option', {
                text: 'Ask before translating ' + data.language,
                style: 'padding: 2px 0;',
                value: 'ask',
                selected: data.preference === 'ask' ? 'selected' : null
            }),
            Element.create( 'option', {
                text: 'Never translate ' + data.language,
                style: 'padding: 2px 0;',
                value: 'never',
                selected: data.preference === 'never' ? 'selected' : null
            })
        ] 
      ),
      closeButton = Element.create( 'div', {
          text: 'X',
          style: 'position: absolute; right: 4px; top: 6px; padding: 2px 4px; height: 16px; width: 16px; color: #666; font: 12px "Lucida Grande", Arial, sans-serif; cursor: pointer;' 
      }),
    ]);
    
    optionsSelect.addEventListener( 'change', function () {
        opera.extension.postMessage({
            action: 'setPreference',
            data: {
        		selection: optionsSelect.value,
        		fromLang: data.langCode
        	}
        });
    }, false );
    
    translateButton.addEventListener( 'click', function () {
        opera.extension.postMessage( {
            action: 'translate',
            data: {
                strings: strings,
                fromLang: data.langCode
            }
        });
        label.textContent = 'Translating page…';
        translateButton.style.display = 'none';
        revertButton.style.visibility = 'hidden';
    }, false );
    
    revertButton.addEventListener( 'click', function () {
        cleanup();
        hideMessage();
    }, true );
    
    closeButton.addEventListener( 'click', function () {
        cleanup();
        hideMessage();
    }, false );
    
    // Auto-translate.
    if ( data.preference === 'always' ) {
        translateButton.click();
    }
    
    var body = document.body;
    body.style.position = 'relative';
    body.style.OTransition = 'top 0.3s ease-in-out';
    body.appendChild( div );
    
    setTimeout( function() {
        body.style.top = '34px';
        div.style.top = '0';
    }, 0);    
    
    // Make sure we know if there are changes before we receive the
    // translation.
    document.addEventListener( 'DOMCharacterDataModified', function c() {
        contentHasChanged = true;
        document.removeEventListener( 'DOMCharacterDataModified', c, true );
    }, true );
    
    // Add show/hide translate bar toggle
    document.addEventListener('keyup', function (e) {
    	keyTriggers.ctrl = keyTriggers.shift = false;
    }, true);
    document.addEventListener('keydown', function (e) {
    	if(e.which == 17) keyTriggers.ctrl=true;
    	if(e.which == 16) keyTriggers.shift=true;
    	if(( e.which == 88 && keyTriggers.ctrl == true && keyTriggers.shift == true )
    			&& !div.removed) {
    		if(div.style.top==='0px') {
    			div.style.top = '-34px';
    		    document.body.style.top = '0';
    		} else {
    			document.body.style.top = '34px';
    	        div.style.top = '0';
    		}
    		return false;
    	}
    }, true);
}

function decodeEntities ( string, div ) {
    div.innerHTML = string;
    return div.textContent;
}

function translate ( translatedStrings, reset ) {
    var l = strings.length,
    	r = reset || false,
        iterator = getIterator(),
        temp = document.createElement( 'div' ),
        textnode;
    if ( !contentHasChanged || r ) {
        // Fast path
        var i = 0;
        while ( ( textnode = iterator.nextNode() ) && i < l ) {
            if ( translatedStrings[i] ) {
                textnode.textContent =
                    decodeEntities( translatedStrings[i], temp );
            }
            i += 1;
        }
    } else {
        // Safe path
        var translated = {},
            translation;
        while ( l-- ) {
            translation = translatedStrings[l];
            if ( translation ) {
                translated[ strings[l] ] = translation;
            }
        }
        while ( ( textnode = iterator.nextNode() ) ) {
            translation = translated[ textnode.textContent ];
            if ( translation ) {
                textnode.textContent = decodeEntities( translation, temp );
            }
        }
    }
    
    // Update bar to say is translated.
    label.textContent = 'Translation complete.';
    revertButton.textContent = 'Show Original';
    revertButton.style.visibility = 'visible';
    revertButton.addEventListener('click', function() {
    	translate( strings, true );
    }, true);
}

function fail () {
    label.textContent = 'A translation error occurred!';
    translateButton.textContent = 'Try again';
    revertButton.textContent = 'Cancel';
    translateButton.style.display = '';
    revertButton.style.visibility = 'visible';
}

opera.extension.addEventListener( 'message', function( message ) {
    switch ( message.data.action ) {
        case 'analysisFailed':
            cleanup();
            break;
        case 'inNativeLanguage':
            cleanup();
            break;
        case 'showMessage':
            showMessage( message.data.data );
            break;
        case 'translate':
            translate( message.data.data );
            break;
        case 'fail':
            fail();
            break;              
    }
}, false );

}, false );

}());
