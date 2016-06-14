var Bootstrap   = require('./bootstrap/AppBootstrap');

$(document).ready(function() {

    // Run application
    window.App  = new Bootstrap();
    App.Router.dispatch();

});


//
// THIS CODE IS AN EXAMPLE
//

$('body').on('click', 'a', function(e) {
    e.preventDefault();
    var target  = $(this).attr('href').replace('#', '/');
    App.Router.to(target);
});