/**
 * App Bootstrap
 *
 * @type type
 */
var Config          = require('../config/config');
var AppRouter       = require('./AppRouter');
var AppView         = require('./AppView');
var AppModel        = require('./AppModel');

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    return { Config: Config, Router: new Router(), Model: new AppModel(), View: AppView };

};