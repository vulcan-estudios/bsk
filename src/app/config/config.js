/**
 * App Configuration
 *
 * @type type
 */

var connections = require('./connections');

var local       = require('./local') || {};

module.exports = {

    /**
     * APP VERSION
     */
    VERSION: '1.0',

    /**
     * ID OF ELEMENT TO APPEND APP HMTL
     */
    SHELL_CONTAINER: '#app',

    /**
     * LOCAL STORAGE
     */
    BROWSER_STORAGE: '001',

    /**
     * ENABLE PUSHSTATE
     */
    PUSHSTATE: true,

    /**
     * ROOT PATH FOR HISTORY AND PUSHSTATE
     */
    ROOT: '/',

    /**
     * API SERVER
     */
    SERVER: connections[ local.connection || 'production'],

    /**
     * TEMPLATE SETTINGS
     */
    TEMPLATE_SETTINGS: {
        evaluate    : /{{([\s\S]+?)}}/g,
        interpolate : /{{=([\s\S]+?)}}/g,
        escape      : /{{-([\s\S]+?)}}/g
    }

};