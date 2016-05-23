/**
 * App Views
 *
 * @type type
 */

var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.js']).views;
var Partials        = require('bulk-require')(__dirname + '/..', ['./views/_shared/partials/**/*.html']).views._shared.partials;

var Zurb            = require('libs/zurb/Zurb');

//var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.html']).views;
//var Partials        = Views._shared.partials;

module.exports = {

    Render: function(data) {

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
        var remove      = 'remove';
        var html        = 'html';

        if(!toRender[initialize]) {

            toRender.initialize = function() {
                this.render();

                // TODO check if this is mandatory
                return this;
            };

        }

        // Assign multiples subviews
        if(!toRender[assign]) {
            toRender.assign     = function(view, selector, data) {
                App.View.Assign(this, view, selector, data);
                return this;
            };
        }

        // Inner HTML
        if(!toRender[html]) {
            toRender.html     = function(view) {
                this.remove();
                this.$el.html( view );

                // Foundation Start
                Zurb.init();
                
                return this;
            };
        }

        // Zombies View?? @TODO
        if(!toRender[remove]) {
            toRender.remove     = function() {
                this.$el.empty();
                this.unbind();
                return this;
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

    },

    Assign: function(view, subview, selector, data) {

        // Get folder and file from router
        var module      = App.Router.module;
        var controller  = App.Router.controller;
        var action      = App.Router.action;

        var subViewPath = path.split('/');
        var subView     = '';
        if(subViewPath.length === 1) {
            subView     = subViewPath[0];
        } else {
            console.error("WE ARE WORKING HERE ;)");
            return;
        }

        // View to render
        var toRender    = (module) ? Views[module][controller][subView] : Views[controller][subView];

        if(!toRender) {
            console.error('VIEW "'+subView+'" NOT FOUND INTO "views/'+ path +'" TO APPEND INTO', action);
            return;
        }

        subview.setElement(view.$(selector)).render(data);

    }

};