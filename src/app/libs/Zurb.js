/**
 * Utility for fundation
 *
 */

var custom   = require('helpers/form/abide');

module.exports  = {

    /**
     * Init
     */
    init: function() {

        $(document).foundation();
        
    },

    /**
     * Custom utility for abide
     */
    abide: function() {

        // Merged
        Foundation.Abide.defaults.patterns      = _.extend(Foundation.Abide.defaults.patterns,      custom.patterns);
        Foundation.Abide.defaults.validators    = _.extend(Foundation.Abide.defaults.validators,    custom.validators);

    }

};