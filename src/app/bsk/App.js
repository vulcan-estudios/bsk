/**
 * App Bootstrap
 *
 * @type type
 */
var Config          = require('../config/config');
var AppRouter       = require('./AppRouter');
var AppView         = require('./AppView');
var AppModel        = require('./AppModel');

// Helpers
var Flash           = require('helpers/flash/flash');
var Form            = require('helpers/form/form');

// Modals
var Modal           = require('helpers/modal/modal');

// Libs
var Filter          = require('libs/filter/Filter');
var Api             = require('libs/Api');

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    var App         =  {

        Config: Config,

        Flash: Flash.init(),

        Router: new Router(),

        Model: new AppModel(),

        View: AppView,

        Filter: Filter,

        Form: Form,

        Modal: Modal,

        Api: Api

    };

    return App;

};