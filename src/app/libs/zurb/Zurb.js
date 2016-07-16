/**
 * Utility for fundation
 *
 */

var Abide       = require('libs/zurb/components/abide');

module.exports  = {

    /**
     * Init
     */
    init: function() {

        $(document).foundation();

        // Abide
        this.abide();

        // Sticky
        this.sticky();

        // Tabs
        this.tabs();


    },

    reflow: function() {

        // Foundation.reInit() ?
        Foundation.reflow();

    },

    /**
     * Custom utility for abide
     */
    abide: function() {

        // Merged
        Foundation.Abide.defaults.patterns      = _.extend(Foundation.Abide.defaults.patterns,      Abide.patterns);
        Foundation.Abide.defaults.validators    = _.extend(Foundation.Abide.defaults.validators,    Abide.validators);

        $('form[data-abide]').attr('novalidate', 'novalidate');

    },

    /**
     * Custom utility for sticky
     */
    sticky: function() {

        $('.md-topbar__sticky').unstick();
        $('.md-topbar__sticky').sticky({topSpacing: 0});

    },

    /**
     * Custom utility for tabs
     */
    tabs: function() {

        $('body').on('change.zf.tabs', '[data-tabs]', function(e) {

        });

    }

};