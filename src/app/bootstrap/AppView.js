/**
 * App Views
 *
 * @type type
 */

var Views           = require('bulk-require')(__dirname + '/..', ['./views/**/*.js']).views;

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
            console.error('VIEW NOT FOUND INTO "views/'+ path +'"');
            return;
        }

        // If not has the initialize method
        var initialize  = 'initialize';

        if(!toRender[initialize]) {
            toRender.initialize = function() {
                this.render();

                // TODO check if this is mandatory
                return this;
            };
        }

        // Check SHELL #app
        if($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        // Render View and append module, controller and action into shell
        var config = {
            el:     $(App.Config.SHELL_CONTAINER).attr('data-module', module).attr('data-controller', controller).attr('data-action', action),
            data:   data
        };

        //console.log(App.Model.Example.getElements());

        var View        = Backbone.View.extend(_.extend(config, toRender));
        return new View();

    }

};