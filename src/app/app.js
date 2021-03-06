// Underscore
require('./libs/underscore/settings')();

// BSK Start
var Application = require('./bsk/App');
var Loader = require('./bsk/AppLoader');

// jQuery Events
var events = require('helpers/events/events');

// Custom bootstrap
var Bootstrap = require('./bootstrap');

var Acl = require('libs/Acl');

$(document).ready(function () {

    // jQuery Events
    $(events);

    // Show loader
    Loader.start();

    // Run application
    window.App = new Application();

    // Run bootstrap
    Bootstrap.init(function () {

        App.Router.dispatch();

            setTimeout(function () {

                // Hide loader
                Loader.stop();

        }, 500);

    });

});
