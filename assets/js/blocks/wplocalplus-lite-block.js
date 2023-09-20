/**
 * Block JavaScript.
 *
 * @package    Wplocalplus_Lite
 * @subpackage Wplocalplus_Lite/assets
 * @author     wpeka <https://club.wpeka.com>
 */

(function( $ ) {
    const { registerBlockType } = wp.blocks; // Blocks API.
    const { createElement } = wp.element; // React.createElement.
    const { __ } = wp.i18n; // Translation functions.
    const { InspectorControls } = wp.blockEditor; // Block inspector wrapper.
    const { TextControl, SelectControl } = wp.components; // Block inspector wrapper.

    // Function to generate a unique ID for each block instance.
    function generateUniqueID() {
        return `wplocalplus-block-${Math.random().toString(36).substring(2, 11)}`;
    }

    registerBlockType( 'wplocalplus-lite/block', {
        title: __( 'WPLocalPlus Business List' ),
        category:  __( 'common' ),
        keywords: [
            __('wplocalplus'),
            __('list'),
            __('business list'),
            __('localplus'),
        ],
        attributes:  {
            list: {
                default: 'wplocal_places',
            },
            type: {
                default: ['hotels'],
            },
            location: {
                default: ['cambridgema'],
            },
            limit: {
                default: 5,
            },
            uniqueID: {
                default: generateUniqueID(), // Generate a unique ID for this block.
            },
        },
        edit(props){
            const attributes =  props.attributes;
            const setAttributes =  props.setAttributes;

            function changeList(list){
                setAttributes({ list });
            }

            function changeLimit(limit){
                setAttributes({ limit });
            }

            function changeType(type){
                setAttributes({ type });
            }

            function changeLocation(location){
                setAttributes({ location });
            }

            // Generate unique keys for each control.
            const listControlKey = generateUniqueID();
            const typeControlKey = generateUniqueID();
            const locationControlKey = generateUniqueID();
            const limitControlKey = generateUniqueID();

            return createElement('div', { key: `${attributes.uniqueID}-main` }, [
                // Preview will go here.
                createElement( 'div', { key: `${attributes.uniqueID}-sub` }, '[wplocalplus list="'+attributes.list+'" type="'+attributes.type+'" location="'+attributes.location+'" limit="'+attributes.limit+'"]' ),
                // Block inspector.
                
                createElement( InspectorControls, { key: `${attributes.uniqueID}-block` },
                    [
                        createElement(SelectControl, {
                            key: `${attributes.uniqueID}-list`,
                            value: attributes.list,
                            label: __( 'List' ),
                            onChange: changeList,
                            type: 'string',
                            options: [
                                { value: 'wplocal_places', label: 'Places' },
                                { value: 'wplocal_reviews', label: 'Reviews' },
                            ]
                        }),
                        createElement(SelectControl, {
                            key: `${attributes.uniqueID}-place`,
                            multiple: true,
                            value: attributes.type,
                            label: __( 'Place Type' ),
                            onChange: changeType,
                            type: 'string',
                            options: place_types, // Make sure place_types is defined
                        }),
                        createElement(SelectControl, {
                            key: `${attributes.uniqueID}-location`,
                            multiple: true,
                            value: attributes.location,
                            label: __( 'Location' ),
                            onChange: changeLocation,
                            type: 'string',
                            options: locations, // Make sure locations is defined
                        }),
                        createElement(TextControl, {
                            key: `${attributes.uniqueID}-limit`,
                            value: attributes.limit,
                            label: __( 'Limit per Page' ),
                            onChange: changeLimit,
                            type: 'number',
                            min: 1,
                            step: 1
                        }),
                    ]
                )
            ] )
        },
        save(){
            return null; // Save has to exist. This is all we need.
        }
    });
})( jQuery );