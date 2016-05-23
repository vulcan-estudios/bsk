/**
 * App Views
 *
 * @type type
 */

var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.js']).views;
var Partials        = require('bulk-require')(__dirname + '/..', ['./views/_shared/partials/**/*.html']).views._shared.partials;

//var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.html']).views;
//var Partials        = Views._shared.partials;

module.exports = {

    render: function(data) {

        // Get folder and file from router
        var module      = App.Router.module;
        var controller  = App.Router.controller;
        var action      = App.Router.action;

        // Get Path
        var path        = (module)  ? module +'/'+ controller +'/'+ action : controller +'/'+ action;

        // View to render
        var toRender    = (module) ? Views[module][controller][action] : Views[controller][action];

        if(!toRender) {
            console.error('VIEW "'+action+'" NOT FOUND INTO "views/'+ path +'"');
            return;
        }

        // If not has the initialize method
        var initialize  = 'initialize';
        var assign      = 'assign';

        if(!toRender[initialize]) {

            toRender.initialize = function() {
                this.render();

                // TODO check if this is mandatory
                return this;
            };

        }

        // Assign multiples subviews
        if(!toRender[assign]) {
            toRender.assign     = function(view, selector) {
                view.setElement(this.$(selector)).render();
            };
        }

        // Check SHELL #app
        if($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        // Render View and append module, controller and action into shell
        $('body').attr('data-module', module);
        var config = {
            el:     $(App.Config.SHELL_CONTAINER).attr('data-controller', controller).attr('data-action', action),
            data:   data
        };

        var View        = Backbone.View.extend(_.extend(config, toRender));
        return new View();

    },

    partial: function(partial, data) {

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

    },

    renderHTML: function(data) {

        // Get folder and file from router
        var module      = App.Router.module;
        var controller  = App.Router.controller;
        var action      = App.Router.action;

        if(action === 'index') {
            console.error('THE ACTION NAME "', action, '" IS NOT VALID INTO "', controller, '" Controller');
            return false;
        }

        // Get Path
        var path        = (module)  ? module +'/'+ controller +'/'+ action : controller +'/'+ action;

        // View to render
        var html        = (module) ? Views[module][controller][action] : Views[controller][action];

        // Check view
        if(!html) {
            console.error('VIEW "'+action+'" NOT FOUND INTO "views/'+ path +'"');
            return;
        }

        // Check SHELL #app
        if($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        // Render View and append module, controller and action into shell
        $('body').attr('data-module', module);

        var toRender = {

            el:         $(App.Config.SHELL_CONTAINER).attr('data-controller', controller).attr('data-action', action),
            data:       data,
            template:   _.template(html),

            // Initialize
            initialize: function() {
                this.render();

                // TODO check if this is mandatory
                return this;
            },

            // Render
            render: function() {

                // Load the compiled HTML into the Backbone "el"
                this.$el.html( this.template(this.data) );
            }

        };

        var View        = Backbone.View.extend(toRender);
        return new View();

    },

};