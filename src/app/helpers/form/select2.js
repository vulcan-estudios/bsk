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
            const url       = $input.attr('data-select-url');
            const text      = $input.attr('data-select-text')   || 'name';
            const key       = $input.attr('data-select-key')    || 'id';
            
            let config      = {
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
            };
                     
            // If has ajax settings
            config      = _.extend(config, (url === undefined) ? {} : { 
                ajax: {
                    transport: function (params, success, failure) {
                        App.Api.get(params.url+'?'+$.param(params.data)).always(function(r) {
                            success( r.success === true ? r.data : {items: []}) ;                        
                        });
                    },
                    url: url,
                    dataType: 'jsonp',
                    delay: 250,
                    cache: true,
                    data: function (params) {
                        return {
                            s: params.term                            
                        };
                    },
                    processResults: function (data, params) {                        
                        return {
                            results: _.map(data.items || [], function(row) {    
                                let partText    = text.split('|');
                                let fullText    = [];
                                _.each(partText, function(i) {
                                    if(row[i]) {
                                        fullText.push(row[i]);
                                    };
                                });
                                return {id: row[key], text: fullText.join(' | ')};
                            })
                        };
                    }
                }
            });
            
            $input.select2(config).parent().find('.select2-selection').on('focus', function() {
                $(this).closest('.select2').prev('select').select2('open');
            }).on('blur', function () {
                
            }); 

            $(this).attr('data-plugin-loaded', true);

        });

    }

};
