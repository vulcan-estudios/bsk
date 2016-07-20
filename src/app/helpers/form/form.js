/**
 *
 * Form
 *
 */
$.serializeJSON.defaultOptions.parseAll = true;

module.exports   = {

    /**
     * Method to get form elements
     *
     * @param jQuery $form
     * @param string field
     * @returns Object
     */
    get: function($form, field) {

        var data    = $form.find(':input').filter(function () {
            if($(this).data('currency') !== undefined) {
                return $.number( this.value, 2, '.', ',' );
            }
            if($(this).data('decimal') !== undefined) {
                return $.number( this.value, 2, '.', '' );
            }
            var tmpValue    = $.trim(this.value);
            return (tmpValue) ? tmpValue : '0'; // Send zero to send empty value
        }).serializeJSON({checkboxUncheckedValue: "0"});

        return (field) ? data[field] : data;

    },

    /**
     * Autoload form with a model or values
     *
     * @param String model
     * @param Object attrs
     * @example Form.autoload('user', { name: 'John Doe', email: 'jhondoe@example.com' }
     *
     */
    load: function(attrs, model, form) {

        // Each values
        $.each(attrs, function(key, value) {

            //
            // key: value
            //
            // key: {
            //     id: value (id is required)
            // }
            //
            // Input: name="model[attribute]" value="value"
            //

            if(value === null) {
                value   = '';
            } else if(typeof value === 'object' && value.id) {
                value   = value.id;
            }

            let $input;

            if(form) {
                $input  = (model) ? $('[name="'+ model +'['+ key +']"]', form) : $('[name="'+key+'"]', form);
            } else {
                $input  = (model) ? $('[name="'+ model +'['+ key +']"]') : $('[name="'+key+'"]');
            }

            // If exist
            if($input.size() > 0 ) {

                // is checkbox
                if ($input.is(':checkbox')) {

                    (value && value !== '0') ? $input.prop('checked', true).change() : $input.prop('checked', false).change();

                    var container   = $input.parents('.md-switch__container:first');
                    if(container.size() > 0) {
                        if(!$input.is(':checked')) {
                            container.find(':input').not(':checkbox').attr('disabled', 'disabled');

                            // Only if has class md-switch__display
                            container.find('.md-switch__display').fadeOut().addClass('hide');
                        } else {
                            container.find(':input').not(':checkbox').removeAttr('disabled');

                            // Only if has class md-switch__display
                            container.find('.md-switch__display').fadeIn().removeClass('hide');

                            setTimeout(function() {
                                container.find(':input').not(':checkbox').first().trigger('focus');
                            }, 100);
                        }
                    }

                } else {

                    // if is datepicker
                    if($input.data('datepicker') !== undefined) {
                        var tmpFormat   = $input.attr('data-format') || 'MM/DD/YYYY';
                        if(value.indexOf("Z") > 0) {
                            value           = (value) ? moment(value).format(tmpFormat) : '';
                        } else if(value.length > 10) {
                            value           = (value) ? moment(value, 'YYYY-MM-DD hh:ii:ss').format(tmpFormat) : '';
                        } else {
                            value           = (value) ? moment(value, 'YYYY-MM-DD').format(tmpFormat) : '';
                        }
                    }

                    // if is currency
                    if($input.data('currency') !== undefined) {
                        value               = (value)   ? $.number(value, 2, '.', ',' ) : '0';
                    }

                    // if is decimal
                    if($input.data('decimal') !== undefined) {
                        value               = (value)   ? $.number(value, 2, '.', '' ) : '0';
                    }

                    $input.val(value);

                }
            }

        });
    },

    /**
     * Remove input error
     * @param JQuery Object object
     */
    inputValid: function($input, timeout) {
        var $container  = $input.parents('div:first');
        setTimeout(function() {
            $container.find('label').removeClass('is-invalid-label');
            $container.find('.form-error').removeClass('is-visible');
            $input.removeAttr('data-invalid').removeAttr('aria-invalid').removeClass('is-invalid-input');
        }, (timeout > 0) ? timeout : 500);
    },

    /**
     * Show input error
     * @param JQuery Object object
     */
    inputInvalid: function($input, msg, timeout) {
        var $container  = $input.parents('div:first');
        var $inputError = $container.find('.form-error');
        setTimeout(function() {
            $container.find('label').addClass('is-invalid-label');
            if(msg) {
                $inputError.html(msg);
            }
            $inputError.addClass('is-visible');
            $input.attr('data-invalid', '').attr('aria-invalid', 'true').addClass('is-invalid-input');
            $input.parents('form:first').attr('data-invalid', '');
        }, (timeout > 0) ? timeout : 500);
    },

    /**
     * Return a select populated with the data
     * @param $jquery $input
     * @param array data
     * @param Object fields
     * @returns null
     */
    dbSelect: function($input, data, fields, blank, value) {

        if(!data || !Array.isArray(data)) {
            return;
        }

        if(!fields) {
            fields  = {value: 'id', option: 'name'};
        }

        var options = '';
        var tmpSelect = blank || 'Select';
        if (blank || blank === undefined) {
            options = '<option value="">' + tmpSelect + '</option>';
        }

        var each = function(items, fEach, cb){
            var total = items.length,
                i     = 0,
                end   =  cb || function(){},
                next  = function(i, items) {
                    setTimeout(function() {
                        fEach(i, items[i]);
                        i++;
                        if(i< total){
                            next(i, items);
                        }else{
                            cb();
                        }
                    }, 0);
                };
            next(i, items);
        };

        $input.empty();
        $input.html('<option value="">Loading...</option>');

        each(data, function(i, j) {
            var row         = data[i];
            var attrs       = fields.attrs || [];
            var pkValue     = row[fields.value] || '';
            var option;

            if(Array.isArray(fields.option)) {
                var tmpOption   = [];
                fields.option.forEach(function(k) {
                    tmpOption.push(row[k] || '');
                });
                option  = tmpOption.join(' ');
            } else if ( /\|/.test(fields.option) ) {
                let parts   = fields.option.split('|');
                let opt     = [];
                parts.forEach(function(i) {
                    if(row[i]) {
                       opt.push(row[i]);
                    }
                });
                option  = opt.join(' | ');
            } else {
                option  = row[fields.option] || '';
            }

            if ((pkValue || pkValue === '0') && option) {
                var selected    = (pkValue === value) ? 'selected="selected"' : '';
                var dataAttrs   = [];
                if(attrs) {
                    _.each(attrs, function(i) {
                        if(row[i]) {
                            dataAttrs.push(`data-${i}="${row[i]}"`);
                        }
                    });
                }
                options += '<option value="' + pkValue + '" '+ selected +' '+ dataAttrs.join(' ') +'>' + option + '</option>';
            }
        }, function(){
            $input.empty();
            $input.html(options);
        });

    }


};