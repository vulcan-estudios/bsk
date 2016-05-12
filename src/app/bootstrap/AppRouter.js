/**
 * Router
 *
 * @type type
 */

var Config          = require('../config/config');
var AppController   = require('./AppController');
var Controllers     = require('bulk-require')(__dirname + '/..', ['./controllers/**/*.js']).controllers;

module.exports = {

    /**
     * Module Name
     */
    module: '',

    /**
     * Controller Name
     */
    controller: '',

    /**
     * Action Name
     */
    action: '',

    /**
     * Parameters
     */
    parameters: [],

    // Initialize
    initialize: function() {

    },

    // Dispacth current url
    dispatch: function() {

        // Bind Controllers Routes into router
        this._bindExternalRoutes();

        // Start History
        Backbone.history.start({

            pushState: Config.PUSHSTATE,

            root: Config.ROOT

        });

    },

    /**
     * Bind Controller
     * brands:                      BrandsController.list
     * notifications/user/:id:      notifications.UserController.get
     *
     */
    _bindExternalRoutes: function() {

        this.routes     = {};

        // Merge actions for NameController.action or folder.NameController.action
        var mergeAction = function(name, paths) {
            var rs      = _.mapObject(paths || {}, function(action) {

                // NameController.action or folder.NameController.action
                return name +'.'+ action;
            });
            return rs;
        };

        for(name in Controllers) {
            if(!/controller/i.test(name)) {
                for(submodule in Controllers[name]) {
                    this.routes  = _.extend(this.routes, mergeAction(name +'.'+ submodule, Controllers[name][submodule].routes))
                }
            } else {
                this.routes = _.extend(this.routes, mergeAction(name, Controllers[name].routes));
            }
        }

        // bind backbone routes
        this._bindRoutes();

    },

    // Execute
    execute: function(cb, params, route) {

        var source                  = route.split('.');

        var controllerName          = (source.length > 2) ? source[1] : source[0];
        var controllerPath          = 'controllers/'+ ( (source.length > 2) ? source[0]+'/'+source[1] : source[0] );

        this.module                 = (source.length > 2) ? source[0] : '';
        this.controller             = controllerName.toLowerCase().replace('controller', '');
        this.action                 = source.pop();
        this.parameters             = params;

        var filter                  = '_beforeFilter';
        var tmpController;

        if(this.module) {
            tmpController           = Controllers[this.module][controllerName] || {};
        } else {
            tmpController           = Controllers[controllerName] || {};
        }

        // Check if exist
        if(!tmpController) {
            console.error('CONTROLLER "', controllerPath, '" NOT FOUND');
            return false;
        }

        // Find and exec the controller
        var BController             = Backbone.Controller.extend(_({}).extend(AppController, tmpController));

        var ObjController           = new BController();

        if(ObjController[filter] && (ObjController[filter]() === false)) {
            console.log('EXIT FROM BEFORE FILTER INTO "', controllerPath, '"');
            return false;
        }

        // Run Action
        if(!ObjController[this.action]) {
            console.error('ACTION "', this.action, '" NOT FOUND INTO ', controllerPath);
            return false;
        }

        // Run method
        ObjController[this.action].apply(ObjController, params);

    },

    // Redirect to url
    to: function(target) {

        this.navigate(target, {trigger: true});

    }

};