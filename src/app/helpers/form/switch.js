/**
 *
 * Siwtch
 *
 */

module.exports   = function() {

    // Disable Siwtch Elements
    $('body').on('change', '.md-switch__container [type="checkbox"]', function(e) {
        
        var este        = $(this);
        var container   = este.parents('.md-switch__container:first');

        if(!este.is(':checked')) {
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

    });

};