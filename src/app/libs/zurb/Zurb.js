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

        const _this = this;

        // REMOVE ALL TOOLTIP
        $('[role="tooltip"]').remove();

        setTimeout(function() {

            $(document).foundation();

            // Abide
            _this.abide();

            // Sticky
            _this.sticky();

            // Tabs
            _this.tabs();

        }, 100);


    },

    reflow: function() {

        const _this = this;
        try {
            //Foundation.reInit();
            new Foundation.Abide($('body').find('form[data-abide]'));
            setTimeout(function() {
                _this.init();
            }, 1000);
        } catch(e) {}

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
