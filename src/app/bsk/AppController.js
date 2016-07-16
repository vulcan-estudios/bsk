/**
 * App Configuration
 *
 * @type type
 */

module.exports = {

    // Default module
    module: 'Dashboard',

    // Callback before execute any controller
    initialize: function() {

        // Hide search form
        App.Model.Header.set({module: this.module, search: false});

    }

};