/**
 * App Bootstrap
 *
 * @type type
 */
var Config          = require('../config/config');
var AppRouter       = require('./AppRouter');
var AppView         = require('./AppView');
var AppModel        = require('./AppModel');

// Libs
var Zurb            = require('libs/zurb/Zurb');
var Filter          = require('libs/filter/Filter')

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    Zurb.init();

    return { Config: Config, Router: new Router(), Model: new AppModel(), View: AppView, Filter: Filter };

};