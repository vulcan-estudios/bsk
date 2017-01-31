/**
 * App Views
 *
 * @type type
 */

var Views = require('bulk-require')(__dirname + '/..', ['./views/**/*.js']).views;
var TmpPartials = require('bulk-require')(__dirname + '/..', ['./views/_shared/partials/**/*.html']).views;
var Partials = (TmpPartials !== undefined) ? (TmpPartials._shared.partials || {}) : {};
var Components = (Views._shared) ? Views._shared.components : {};

module.exports = {

    /**
     * Curent View to render
     */
    currentView: {},

    // Views Loaded to delete zombies
    viewsLoaded: [],

    // Current module
    module: '',

    // Current controller
    controller: '',

    // Current action
    action: '',

    /**
     * Method to run current view
     * @param {type} data
     * @returns {undefined|nm$_AppView.module.exports.Run.Main}
     */
    Run: function () {

        // Check SHELL #app
        if ($(App.Config.SHELL_CONTAINER).size() === 0) {
            console.error("THE SHELL ", App.Config.SHELL_CONTAINER, " COULD NOT BE FOUND INTO THE DOCUMENT. PLEASE CHECK YOUT CONFIG FILE");
            return;
        }

        var config = {
            el: $(App.Config.SHELL_CONTAINER),
            view: this.currentView
        };

        $('body').attr('data-module', this.module)
                .attr('data-controller', this.controller)
                .attr('data-action', this.action);

        var Main = Backbone.View.extend(_.extend(config, Views.main));
        return new Main();

    },

    /**
     * Method to render an action into controller
     * @param {type} data
     * @returns {nm$_AppView.module.exports.Run.Main|undefined}
     */
    Render: function () {

        var params = arguments;
        var data = {};

        var _this = this;

        _this.module = App.Router.module;

        _this.controller = App.Router.controller;

        _this.action = App.Router.action;

        if (typeof params[0] === 'string') {
            data = params[1] ? params[1] : {};
            tmpPath = App.Filter.get(params[0], 'trim', '/').split('/');
            if (tmpPath.length > 2) {
                _this.module = tmpPath[0];
                _this.controller = tmpPath[1];
                _this.action = tmpPath[2];
            } else {
                _this.module = null;
                _this.controller = tmpPath[0];
                _this.action = tmpPath[1];
            }
        } else {
            data = params[0];
        }

        // Get Path
        var path = (_this.module) ? _this.module + '/' + _this.controller + '/' + _this.action : _this.controller + '/' + _this.action;

        try {
            // View to render
            var toRender = (_this.module) ? Views[_this.module][_this.controller][_this.action] : Views[_this.controller][_this.action];
            if (!toRender) {
                throw "View not found";
            }
        } catch (e) {
            console.error('VIEW "' + _this.action + '" NOT FOUND INTO "views/' + path + '"');
            return;
        }

        toRender.viewsLoaded = [];

        if (!toRender['initialize']) {
            toRender.initialize = function () {
                this.render();
                return this;
            };
        }

        toRender.html = function (html) {
            this.clean();
            this.$el.html(html);
            if (toRender.events) {
                this.delegateEvents();
            }
        };

        toRender.append = function (html, selector) {
            if (typeof html === 'string') {
                (selector) ? this.$el.find(selector).append(html) : this.$el.append(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).append(html.el) : this.$el.append(html.el);
            }
        };

        toRender.prepend = function (html, selector) {
            if (typeof html === 'string') {
                (selector) ? this.$el.find(selector).prepend(html) : this.$el.prepend(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).prepend(html.el) : this.$el.prepend(html.el);
            }
        };

        // Clean view
        toRender.clean = function () {

            // Remove all views loaded previously
            this.viewsLoaded.forEach(function (view) {
                view.remove();
            });

            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();

        };

        var config = {
            tagName: 'main',
            className: '',
            data: data || {}
        };

        var View = Backbone.View.extend(_.extend(config, toRender));
        this.currentView = new View();

        return _this.Run();

    },

    SubView: function (view, options) {

        let subview = options.view || {};
        let data = options.data || {};
        let el = options.el || '';

        if (!subview['initialize']) {
            subview.initialize = function () {
                this.render();
                return this;
            };
        }

        subview.html = function (html) {
            this.$el.html(html);
            if (subview.events) {
                this.delegateEvents();
            }
        };

        subview.append = function (html, selector) {
            if (typeof html === 'string') {
                (selector) ? this.$el.find(selector).append(html) : this.$el.append(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).append(html.el) : this.$el.append(html.el);
            }
        };

        subview.prepend = function (html, selector) {
            if (typeof html === 'string') {
                (selector) ? this.$el.find(selector).prepend(html) : this.$el.prepend(html);
            } else {
                this.viewsLoaded.push(html);
                (selector) ? this.$el.find(selector).prepend(html.el) : this.$el.prepend(html.el);
            }
        };

        var config = {
            tagName: 'section',
            el: el,
            data: data || {}
        };

        var extSubView = Backbone.View.extend(_.extend(config, subview));
        var objSubView = new extSubView();
        view.viewsLoaded.push(objSubView);
        return objSubView;

    },

    /**
     * Load a component to append into a view
     * @param {type} name
     * @returns {undefined|nm$_AppView.module.exports.Component.Component}
     */
    Component: function (name, data) {

        // Get Folder - Component
        var toAppendFolder = Components[name];

        // Get Component
        var toAppend = !toAppendFolder ? null : toAppendFolder[name];
        if (!toAppend) {
            console.error('COMPONENT "' + name + '" NOT FOUND INTO "views/_shared/components/" TO APPEND INTO MAIN VIEW');
            return;
        }

        if (!toAppend['initialize']) {
            toAppend.initialize = function () {
                this.render();
                return this;
            };
        }

        toAppend.html = function (html) {
            this.$el.html(html);
        };

        toAppend.append = function (html) {
            this.$el.append(html);
        };

        toAppend.prepend = function (html) {
            this.$el.prepend(html);
        };

        var config = {
            data: data
        };

        var Component = Backbone.View.extend(_.extend(config, toAppend));
        return new Component();

    },

    /**
     * Render a partial
     *
     * @param {type} partial
     * @param {type} data
     * @returns {Boolean}
     */
    Partial: function (partial, data) {

        var tmpFolder = partial.split('/');
        var hasFolder = tmpFolder.length > 1 ? true : false;

        if (hasFolder) {
            var html = tmpFolder[1];
            var folder = tmpFolder[0];
            partial = Partials[folder][html];
        } else {
            partial = Partials[partial];
        }
        if (!partial) {
            console.error("PARTIAL", partial, "NOT FOUND INTO views/_shared/partials");
            return false;
        }
        return _.template(partial)(data);

    }

};
