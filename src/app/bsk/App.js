/**
 * App Bootstrap
 *
 * @type type
 */
var Storage         = require('libs/Storage');

var Config          = require('../config/config');
var AppRouter       = require('./AppRouter');
var AppView         = require('./AppView');
var AppModel        = require('./AppModel');

// Helpers
var Flash           = require('helpers/flash/flash');
var Form            = require('helpers/form/form');
var Loader          = require('./AppLoader');

// Modals
var Modal           = require('helpers/modal/modal');

// Libs
var Filter          = require('libs/filter/Filter');
var Api             = require('libs/Api');

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    var App         =  {

        Storage: Storage,

        Config: Config,

        Flash: Flash.init(),

        Router: new Router(),

        Model: new AppModel(),

        View: AppView,

        Filter: Filter,

        Form: Form,

        Modal: Modal,

        Api: Api,

        Loader: Loader

    };

    return App;

};