(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// Libs
var Zurb            = require('libs/zurb/Zurb');
var Filter          = require('libs/filter/Filter');

module.exports = function() {

    var Router      = Backbone.Router.extend(AppRouter);

    Zurb.init();

    return { Config: Config, Flash: Flash.init(), Router: new Router(), Model: new AppModel(), View: AppView, Filter: Filter };

};
},{"../config/config":6,"./AppModel":3,"./AppRouter":4,"./AppView":5,"helpers/flash/flash":13,"libs/filter/Filter":15,"libs/zurb/Zurb":19}],2:[function(require,module,exports){
/**
 * App Configuration
 *
 * @type type
 */

module.exports = {

    // Callback before execute any controller
    initialize: function() {

    }

};
},{}],3:[function(require,module,exports){
/**
 * App Model
 *
 * @type type
 */

var Models  = ({"models":({"Example":require("../models/Example.js")})}).models;

module.exports  = function() {

    var objs    = {};

    _(Models).each(function(model, key) {

        var collection  = function(data) {
            var tmpCollection   = Backbone.Collection.extend({
                model: App.Model[key]
            });
            return new tmpCollection(data);
        };

        objs[key]   = Backbone.Model.extend( _({}).extend(model, {Collection: collection}) );

    });

    return objs;

};
},{"../models/Example.js":22}],4:[function(require,module,exports){
/**
 * Router
 *
 * @type type
 */

var Config          = require('../config/config');
var AppController   = require('./AppController');
var Controllers     = ({"controllers":({"BrandsController":require("../controllers/BrandsController.js"),"HomeController":require("../controllers/HomeController.js"),"MarketsController":require("../controllers/MarketsController.js"),"notifications":({"UsersController":require("../controllers/notifications/UsersController.js")})})}).controllers;

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
    to: function(target, cb) {

        this.navigate(target, {trigger: true});
        if(cb) {
            setTimeout(function() {
                cb();
            }, 200);
        }

    }

};
},{"../config/config":6,"../controllers/BrandsController.js":9,"../controllers/HomeController.js":10,"../controllers/MarketsController.js":11,"../controllers/notifications/UsersController.js":12,"./AppController":2}],5:[function(require,module,exports){
/**
 * App Views
 *
 * @type type
 */

var Views           = ({"views":({"home":(function () {var f = require("../views/home/index.js");f["index"]=require("../views/home/index.js");f["list"]=require("../views/home/list.js");return f;})()})}).views;
var Partials        = ({"views":({"_shared":({"partials":({"folder":({"test3":require("../views/_shared/partials/folder/test3.html")}),"test1":require("../views/_shared/partials/test1.html"),"test2":require("../views/_shared/partials/test2.html"),"test4":require("../views/_shared/partials/test4.html")})})})}).views._shared.partials;

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
},{"../views/_shared/partials/folder/test3.html":23,"../views/_shared/partials/test1.html":24,"../views/_shared/partials/test2.html":25,"../views/_shared/partials/test4.html":26,"../views/home/index.js":27,"../views/home/list.js":28}],6:[function(require,module,exports){
/**
 * App Configuration
 *
 * @type type
 */

var connections = require('./connections');

var local       = require('./local') || {};

module.exports = {

    /**
     * APP VERSION
     */
    VERSION: '1.0',

    /**
     * ID OF ELEMENT TO APPEND APP HMTL
     */
    SHELL_CONTAINER: '#app',

    /**
     * LOCAL STORAGE
     */
    BROWSER_STORAGE: '001',

    /**
     * ENABLE PUSHSTATE
     */
    PUSHSTATE: false,

    /**
     * ROOT PATH FOR HISTORY AND PUSHSTATE
     */
    ROOT: '/',

    /**
     * API SERVER
     */
    SERVER: connections[ local.connection || 'production']

};
},{"./connections":7,"./local":8}],7:[function(require,module,exports){
/**
 * All Connections
 *
 * @type type
 */

module.exports = {

    development: {

        // API
        host:  'http://dev.com/v1/',

        // Custom header to send into request
        headers: {

        }

    },

    production: {

        // API
        host:  'http://prod.com/v1/',

        // Custom header to send into request
        headers: {

        }

    }

};
},{}],8:[function(require,module,exports){
/**
 * Local environment settings
 *
 * This file override the config.js with your custom parameters
 *
 */

module.exports = {

    connection: 'development'

};
},{}],9:[function(require,module,exports){
/**
 * BrandsController
 *
 * @description
 */


module.exports = {

    routes: {

        'brands':                 'index',
        'brands/get/:id':         'get',
        'brands/list':            'list'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Brands');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Brands');

    }

};
},{}],10:[function(require,module,exports){
/**
 * HomeController
 *
 * @description
 */


module.exports = {

    // Internal Routes
    routes: {

        'home':                 'index',
        'home/get/:id':         'get',
        'home/list':            'list',
        'home/redirect':        'redirect'

    },

    // Home
    index: function() {

        var Model       = new App.Model.Example();
        console.log(Model.get('id'));

        App.View.render();

    },

    // List all elements
    list: function() {

        var Model       = new App.Model.Example({id: 000, name: 'Model'});

        var Collection  = new App.Model.Example().Collection([
            {id: 123, name: 'A'},
            {id: 456, name: 'B'},
            {id: 789, name: 'C'},
            Model
        ]);

        Collection.each(function (model, index, all) {
            console.log(model.get("name"));
            // A
            // B
            // C
        });

        Model.on("change:id", function(model){
            var id = model.get("id");
            console.log("Changed my id to " + id );
        });

        Model.set('id', 123);

        console.log(Model.get('id'));

        App.View.render({ data: Model.getElements() });

    },

    // Get with Param
    get: function(id) {

        console.log('Entró al get del Home: ', id);

    },

    // Redirect to other url
    redirect: function() {

        App.Router.to('home/list', function() {
            App.Flash.valid('Redirect');
        });

    }

};
},{}],11:[function(require,module,exports){
/**
 * MarketsController
 *
 * @description
 */


module.exports = {

    routes: {

        'markets':                 'index',
        'markets/get/:id':         'get',
        'markets/list':            'list'

    },

    // Callback before run
    _beforeFilter: function() {

        console.log('before Filter Markets');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Markets');

    }

};
},{}],12:[function(require,module,exports){
/**
 * UsersController
 *
 * @description
 */


module.exports = {

    routes: {

        'notification/users':                 'index',
        'notification/users/get/:id':         'get',
        'notification/users/list':            'list',
        'notification/users/test/:id':         'test'

    },

    // Callback before to run
    _beforeFilter: function() {

        console.log('before Filter Users');

    },

    // Index
    index: function() {

        console.log('Entró a index Users');

    },

    // List all elements
    list: function() {

        console.log('Entró a listar Users');

    },

    // Get with PAram
    get: function(param) {

        console.log('Entró al get del Users: ', param);

    }

};
},{}],13:[function(require,module,exports){
/**
 *
 * Helper Flash
 *
 * Flash.valid('Hello');
 *
 * Flash.error('Error');
 *
 */

var template    = require('./templates/default.html');

module.exports  = {

    target: '.flash-message',

    /**
     * Initialize
     */
    init: function(element) {
        this.target  = (element) || '.flash-message';
        if($(this.target+':first').size() < 1) {
            $('body').append('<div class="row"><div class="small-11 medium-9 small-centered columns"><div class="'+ this.target.replace('.', '') +'"></div></div></div>');
        }
        this.buffer();
        this.bind();
        return this;
    },

    /**
     * Bind Event
     */
    bind: function() {
        $('body').on('click', '.alert-box .close', function(e) {
            e.preventDefault();
            $(this).parents('.alert-box:first').hide();
        });
    },

    /**
     * Show Valid Message
     *
     * @param String msg
     * @param Mixing cb
     */
    valid: function(msg, cb) {
        this.display('valid', msg, cb);
    },

    /**
     * Show Info Message
     *
     * @param String msg
     * @param Mixing cb
     */
    info: function(msg, cb) {
        this.display('info', msg, cb);
    },

    /**
     * Show Warning Message
     *
     * @param String msg
     * @param Mixing cb
     */
    warning: function(msg, cb) {
        this.display('warning', msg, cb);
    },

    /**
     * Show Error Message
     *
     * @param String msg
     * @param Mixing cb
     */
    error: function(msg, cb) {
        this.display('alert', msg, cb);
    },

    /**
     *
     * @param String type
     * @param String msg
     * @param Mixing cb
     */
    display: function (type, msg, cb) {
        var data    = {
            id:     Math.floor(Math.random()*11),
            type:   type,
            text:   msg,
            delay:  7000
        };
        if(cb!==undefined) {
            if (typeof cb === "function") {
                $.cookie('flash-message', _.template(template)({msg: data}), { path: '/' });
                setTimeout(function() { cb(); }, 100);
                return;
            } else if(parseInt(cb) > 0) {
                data.delay  = cb;
            }
        }
        this.clear();
        $(this.target+':first').append(_.template(template)({msg: data}));
    },

    /**
     * Clear all flash
     */
    clear: function() {
        $(this.target).empty();
    },

    /**
     * Show Buffer Message
     */
    buffer: function() {
        if($.cookie('flash-message')) {
            $(this.target+':first').append($.cookie('flash-message'));
            $.removeCookie('flash-message', { path: '/' });
        }
    }

};
},{"./templates/default.html":14}],14:[function(require,module,exports){
module.exports = "<div id=\"alert-id-<%= msg.id %>\" data-alert class=\"alert-box callout radius <%= msg.type %>\">\n    <a href=\"#\" class=\"close\">&times;</a>\n    <i class=\"mdi mdi-alert-box\"></i>\n    <i class=\"mdi mdi-checkbox-market\"></i>\n    <i class=\"mdi mdi-close-octagon\"></i>\n    <i class=\"mdi mdi-bell\"></i>\n    <%= msg.text %>\n</div>\n<script type=\"text/javascript\">$(\"#alert-id-<%= msg.id %>\").delay('<%= msg.delay %>').fadeOut(500);</script>";

},{}],15:[function(require,module,exports){
/**
 * Filter
 *
 * Filter.get(' custom string', 'trim');
 * return 'custom
 *
 */

var Filters     = ({"ltrimFilter":require("./filters/ltrimFilter.js"),"rtrimFilter":require("./filters/rtrimFilter.js"),"trimFilter":require("./filters/trimFilter.js")});

module.exports  = {

    get: function(str, filters, opts) {

        var _this       = this;

        if(Array.isArray(filters)) {
            filters.forEach(function(filter) {
                var f   = _this.load(filter);
                str     = f.exec(str, opts);
            });
            return str;
        } else {
            var f       = _this.load(filters);
            return f.exec(str, opts);
        }

    },

    load: function(filter) {
        if(!Filters[filter+'Filter']) {
            console.error("FILTER", filter, "NOT FOUND INTO /libs/filter/filters");
        }
        return Filters[filter+'Filter'];
    }



};
},{"./filters/ltrimFilter.js":16,"./filters/rtrimFilter.js":17,"./filters/trimFilter.js":18}],16:[function(require,module,exports){
/**
 * Filter ltrim
 *
 * Filter.get('custom string', 'ltrim', 'cus');
 * return 'tom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {
        if (opt) {
            while (str.charAt(0) == opt)
                str = str.substr(1, str.length - 1);
        } else {
            while (str.charAt(0) == " ")
                str = str.substr(1, str.length - 1);
        }
        return str;
    }

};
},{}],17:[function(require,module,exports){
/**
 * Filter ltrim
 *
 * Filter.get('custom string', 'ltrim', 'cus');
 * return 'tom string'
 *
 */
module.exports   = {

    exec: function(str, opt) {
        if (opt) {
            while (str.charAt(str.length - 1) == opt)
                str = str.substr(0, str.length - 1);
        } else {
            while (str.charAt(str.length - 1) == " ")
                str = str.substr(0, str.length - 1);
        }
        return str;
    }

};
},{}],18:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16}],19:[function(require,module,exports){
/**
 * Utility for fundation
 *
 */

var Abide       = require('libs/zurb/components/abide');

module.exports  = {

    /**
     * Init
     */
    init: function() {

        $(document).foundation();

        // Abide
        this.abide();

    },

    reflow: function() {

        // Foundation.reInit() ?
        Foundation.reflow();

    },

    /**
     * Custom utility for abide
     */
    abide: function() {

        // Merged
        Foundation.Abide.defaults.patterns      = _.extend(Foundation.Abide.defaults.patterns,      Abide.patterns);
        Foundation.Abide.defaults.validators    = _.extend(Foundation.Abide.defaults.validators,    Abide.validators);

    }

};
},{"libs/zurb/components/abide":20}],20:[function(require,module,exports){
/**
 *
 * Abide
 *
 * <form data-abide novalidate>
 *
 * </form>
 *
 */
module.exports   = {

    /*
     * CUSTOM PATTERNS
     *
     * Example
     * <input type="text" pattern="year" />
     */
    patterns: {

        // Only positives number
        'pint': /^[0-9]+$/,

        // Year format
        'year': /^(19|20)\d\d/,

        // Month format
        'month': /^(0[1-9]|1[012])/,

        // Day format
        'day': /^(0[1-9]|[12][0-9]|3[01])/,

        // Currency format 1.00
        'currency': /^((\d+)|(\d{1,3})(\,\d{3}|)*)(\.\d{2}|)$/
    },

    /*
     * CUSTOM VALIDATORS
     *
     * Example:
     * <input type="text" data-validator="multi-email" />
     */
    validators: {

        // Validator for input with multiple email: a@b.com, c@d.com, e@f.com
        'multi-email': function($el, required, parent) {

            if(!$el.val()) { // $el is jQuery selector
                return (required) ? false : true; // If not has val but is required
            }

            var valid   = true;

            if($el.val()) {
                var emails  = $el.val().split(',');
                var pattern = Foundation.Abide.defaults.patterns.email;
                $.each(emails, function(i, j) {
                    if(!pattern.test( $.trim(emails[i]) )) {
                        valid   = false;
                        return false;
                    }
                });
            }

            return valid;

        }
    }

};
},{}],21:[function(require,module,exports){
var Bootstrap   = require('./bootstrap/AppBootstrap');

$(document).ready(function() {

    // Run application
    window.App  = new Bootstrap();
    App.Router.dispatch();

});


//
// THIS CODE IS AN EXAMPLE
//

$('body').on('click', 'a', function(e) {
    e.preventDefault();
    var target  = $(this).attr('href').replace('#', '/');
    App.Router.to(target);
});
},{"./bootstrap/AppBootstrap":1}],22:[function(require,module,exports){
/**
 * Example model
 *
 * @description
 */

module.exports = {

    defaults: {
        id: '',
        name: ''
    },

    // Method constuctor
    initialize: function() {

    },

    getElements: function() {
        return ['red', 'blue', 'orange', 'black', 'white', 'yellow'];
    }

};
},{}],23:[function(require,module,exports){
module.exports = "<h2>Test 1: <%= hola %></h2>";

},{}],24:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],25:[function(require,module,exports){
module.exports = "<h2>Test 2: <%= hola %></h2>";

},{}],26:[function(require,module,exports){
module.exports = "<h2>Test 4 without data</h2>";

},{}],27:[function(require,module,exports){
var view        = _.template(require('./templates/index.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( view );

    }

};
},{"./templates/index.html":29}],28:[function(require,module,exports){
var view        = _.template(require('./templates/list.html'));

module.exports  = {

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( view(this.data) );

    }

};
},{"./templates/list.html":30}],29:[function(require,module,exports){
module.exports = "<%= App.View.partial('test1', {hola: 'hola'}) %>\n\n<h1>Index</h1>\n\n<%= App.View.partial('test2', {hola: 'mundo'}) %>\n\n<h1>More Partials</h1>\n\n<%= App.View.partial('test2', {hola: 'mundo 2 repetido'}) %>\n\n<%= App.View.partial('folder/test3', {hola: 'folder 3'}) %>\n\n<%= App.View.partial('test4') %>";

},{}],30:[function(require,module,exports){
module.exports = "<h1>List <%= data %></h1>";

},{}]},{},[21]);
