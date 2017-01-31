/**
 *
 * Timepicker
 *
 * <input type="text" data-time="{integer}" data-time-format="{string}"/>
 *
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as component
     */
    init: function(element) {
        return this.bind(element);
    },

    bind: function(element) {

        // Bind elements
        $(element).not('[data-plugin-loaded]').each(function() {
            let step    = $(this).data('timepicker');
            let format  = $(this).data('timepicker-format');
            let sDefault= $(this).data('timepicker-default');
            $(this).timepicker({'step': step || 30, 'timeFormat':  format || 'h:i A', 'scrollDefault': sDefault || 'now' });
        });

    }
};