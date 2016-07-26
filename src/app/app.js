// Underscore
require('./libs/underscore/settings')();

// BSK Start
var Application     = require('./bsk/App');
var Loader          = require('./bsk/AppLoader');

// jQuery Events
var events          = require('helpers/events/events');

// Custom bootstrap
var Bootstrap       = require('./bootstrap');

$(document).ready(function() {

    // jQuery Events
    $(events);

    // Show loader
    Loader.start();

    // Run application
    window.App  = new Application();

    Bootstrap.init(function() {

        App.Router.dispatch();

        // Hide loader
        Loader.stop();

    });

});