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

    var storage = localStorage;

    function optionChanged( e ) {
        var element = e.currentTarget;
        var name = element.name;
        var value = element.value;

        // Set value
        storage.setItem( name, value );
    }
    
    if( storage.getItem( 'https' ) === '1' ) {
    	document.getElementById( 'httpsOn' ).checked = 'checked';
    } else {
    	document.getElementById( 'httpsOff' ).checked = 'checked';
    }
    
    var optList = document.getElementById( 'optionsList' );
    var homeLangSelect = document.getElementById( 'homeLang' ),
        browserLang = window.navigator.language,
        homeLang = storage.getItem( 'homeLang' ) ||
            ( Translate.languages[ browserLang ] ? browserLang : 'en' );

    // 1. Create the options
    var homeLangOptions = document.createDocumentFragment();
    var optListOptions = document.createDocumentFragment();
    
    for ( var lang in Translate.languages ) {

        var pref = storage.getItem( lang ) || 'ask';

        homeLangOptions.appendChild( Element.create( 'option', {
            text: opera.extension.i18n.getMessage( lang ),
            value: lang,
            selected: homeLang === lang ? 'selected' : null
        }) );

        var optionsSelect, langSettings = Element.create( 'fieldset', null, [
            Element.create( 'label', {
                text: opera.extension.i18n.getMessage( lang ),
                className: 'optionlabel'
            }),
            optionsSelect = Element.create( 'select', {
                name: lang
            }, [
                Element.create( 'option', {
                    text: opera.extension.i18n.getMessage('translate_option_always', [ opera.extension.i18n.getMessage( lang ) ]),
                    value: 'always',
                    selected: pref === 'always' ? 'selected' : null
                }), Element.create( 'option', {
                    text: opera.extension.i18n.getMessage('translate_option_ask', [ opera.extension.i18n.getMessage( lang ) ]),
                    value: 'ask',
                    selected: pref === 'ask' ? 'selected' : null
                }), Element.create( 'option', {
                    text: opera.extension.i18n.getMessage('translate_option_never', [ opera.extension.i18n.getMessage( lang ) ]),
                    value: 'never',
                    selected: pref === 'never' ? 'selected' : null
                })
            ])
        ]);

        // listen for changes
        optionsSelect.addEventListener( 'change', optionChanged, true );

        optListOptions.appendChild( langSettings );
    }
    homeLangSelect.appendChild( homeLangOptions );
    optList.appendChild( optListOptions );
    
    homeLangSelect.addEventListener( 'change', function() {
        opera.extension.postMessage({
            action: 'setHomeLang',
            data: homeLangSelect.value
        });
    }, false );
    document.getElementById( 'clearPreferences' ).addEventListener(
            'click', function () {
        opera.extension.postMessage({
            action: 'resetPreferences'
        });
    }, false );
    document.getElementById( 'blanketPreferences' ).addEventListener(
            'click', function () {
        opera.extension.postMessage({
            action: 'blanketPreferences',
            data: {
            	value: 'always'
            }
        });
    }, false );
    document.getElementById( 'httpsOn' ).addEventListener(
    		'change', function () {
    	storage.setItem( 'https', '1' );
    }, false );
    document.getElementById( 'httpsOff' ).addEventListener(
    		'change', function () {
    	storage.setItem( 'https', '0' );
    }, false );
    opera.extension.addEventListener( 'message', function ( msg ) {
        if ( msg.data.action === 'preferencesReset' ) {
            window.location.reload();
        }
    }, false );
}, false );