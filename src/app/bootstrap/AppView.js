/**
 * App Views
 *
 * @type type
 */

var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.js']).views;
var Partials        = require('bulk-require')(__dirname + '/..', ['./views/_shared/partials/**/*.html']).views._shared.partials || {};
var Components      = Views._shared.components;

module.exports = {

    /**
     * Curent View to render
     */
    currentView:    {},

    loaded: [],

    // Current module
    module:         '',

    // Current controller
    controller:     '',

    // Current action
    action:         '',


    /**
     * Method to run current view
     * @param {type} data
     * @returns {undefined|nm$_AppView.module.exports.Run.Main}
     */
    Run: function() {

        // Check SHELL #app
        if($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        var config = {
            el:     $(App.Config.SHELL_CONTAINER).attr('data-controller', this.controller).attr('data-action', this.action),
            view:   this.currentView
        };

        $('body').attr('data-module', this.module);
        var Main    = Backbone.View.extend(_.extend(config, Views.main));
        return new Main();

    },

    /**
     * Method to render an action into controller
     * @param {type} data
     * @returns {nm$_AppView.module.exports.Run.Main|undefined}
     */
    Render: function() {

        var params      = arguments;
        var data        = {};

        this.module     = App.Router.module;

        this.controller = App.Router.controller;

        this.action     = App.Router.action;

        if(typeof params[0] === 'string') {
            data        = params[1] ? params[1] : {};
            tmpPath     = App.Filter.get(params[0], 'trim', '/').split('/');
            if(tmpPath.length > 2) {
                this.module     = tmpPath[0];
                this.controller = tmpPath[1];
                this.action     = tmpPath[2];
            } else {
                this.module     = null;
                this.controller = tmpPath[0];
                this.action     = tmpPath[1];
            }
        } else {
            data        = params[0];
        }

        // Get Path
        var path        = (this.module)  ? this.module +'/'+ this.controller +'/'+ this.action : this.controller +'/'+ this.action;

        try {
            // View to render
            var toRender    = (this.module) ? Views[this.module][this.controller][this.action] : Views[this.controller][this.action];
            if(!toRender) {
                throw "View not found";
            }
        } catch(e) {
            console.error('VIEW "'+this.action+'" NOT FOUND INTO "views/'+ path +'"');
            return;
        }

        if(!toRender['initialize']) {
            toRender.initialize = function() {
                this.render();
                return this;
            };
        }

        toRender.html           = function(html) {
            this.clean();
            this.$el.html(html);
        };

        // Clean view
        toRender.clean      = function() {

            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();
        };

        var config          = {
            tagName: 'main',
            data: data
        };

        var View            = Backbone.View.extend(_.extend(config, toRender));
        this.currentView    = new View();

        return this.Run();

    },

    /**
     * Load a component to append into a view
     * @param {type} name
     * @returns {undefined|nm$_AppView.module.exports.Component.Component}
     */
    Component: function(name, data) {

        // Get Component
        var toAppend    = Components[name];
        if(!toAppend) {
            console.error('COMPONENT "'+name+'" NOT FOUND INTO "views/_shared/components/" TO APPEND INTO MAIN VIEW');
            return;
        }

        if(!toAppend['initialize']) {
            toAppend.initialize = function() {
                this.render();
                return this;
            };
        }

        toAppend.html           = function(html) {
            this.$el.html(html);
        };

        var config      = {
            data:       data
        };
        var Component   = Backbone.View.extend(_.extend(config, toAppend));
        return new Component();

    },

    /**
     * Render a partial
     *
     * @param {type} partial
     * @param {type} data
     * @returns {Boolean}
     */
    Partial: function(partial, data) {

        var tmpFolder   = partial.split('/');
        var hasFolder   = tmpFolder.length > 1 ? true : false;

        if(hasFolder) {
            var html    = tmpFolder[1];
            var folder  = tmpFolder[0];
            partial     = Partials[folder][html];
        } else {
            partial     = Partials[partial];
        }
        if(!partial) {
            console.error("PARTIAL", partial, "NOT FOUND INTO views/_shared/partials");
            return false;
        }
        return _.template(partial)(data);

    }

};