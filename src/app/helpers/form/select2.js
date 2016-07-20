/**
 * Autocomplete
 */

module.exports  = {

    /**
     * Init
     *
     * @param {string} element class or id to make as autocomplete
     */
    init: function(element) {

        return this.bind(element);

    },

    /**
     * Bind element class or id to autocomplete
     * @param string element
     */
    bind: function(element) {

        var _this       = this;

        // Bind elements
        $(element).not('[data-plugin-loaded]').each(function() {

            const $input    = $(this);
            const tag       = $input.attr('data-select-tag') !== undefined;

            $input.select2({
                minimumInputLength: 2,
                language:   "es",
                tags:       tag,
                createTag: function (tag) {

                    // check if the option is already there
                    let found = false;
                    $input.find('option').each(function() {
                        if ($.trim(tag.term).toUpperCase() === $.trim($(this).text()).toUpperCase()) {
                            found = true;
                        }
                    });

                    // show the suggestion only if a match was not found
                    if (!found) {
                        return {
                            id:     tag.term,
                            text:   tag.term + " (Registrar)",
                            isNew:  true
                        };
                    }
                }
            });

            $(this).attr('data-plugin-loaded', true);

        });

    }

};
