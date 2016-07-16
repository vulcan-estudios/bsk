/**
 * PUSHSTATE
 *
 */

module.exports = function() {

    // Pushstate
    $('body').on('click', 'a[data-pushstate]', function(e) {
        e.preventDefault();
        var target  = $(this).attr('href').replace('#', '/');
        App.Router.to(target);
    });

    // History Back
    $('body').on('click', '[data-back]', function(e) {

        var rx = /INPUT|SELECT|TEXTAREA/i;

        if(e.originalEvent && e.originalEvent.explicitOriginalTarget) {
            var originalTarget  = e.originalEvent.explicitOriginalTarget;
            if(rx.test(originalTarget)){
                e.preventDefault();
                return false;
            }
        }

        e.preventDefault();
        App.Router.back();
        
    });

};
