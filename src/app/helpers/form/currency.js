/**
 *
 * Password
 *
 * <input data-currency|data-decimal />
 *
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as currency
     */
    init: function(element) {
        return this.bind(element);
    },

    /**
     * Bind element class or id to currency
     * @param string element
     */
    bind: function(element) {

        // Bind elements
        $(element).not('[data-plugin-loaded]').each(function() {
            if($(this).attr('data-currency') !== undefined) {
                $(this).number(true, 0, '.', ',');
            } else {
                $(this).number(true, 2, '.', ',');
            }
            $(this).attr('data-plugin-loaded', true);
        });

    }

};