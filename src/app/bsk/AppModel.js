/**
 * App Model
 *
 * @type type
 */

var Models  = require('bulk-require')(__dirname + '/..', ['./models/**/*.js']).models;

module.exports  = function() {

    var objs    = {};

    _(Models).each(function(model, key) {

        var tmpModel            = Backbone.Model.extend(_({}).extend(model, {

            objCollection: null,

            setCollection: function(data) {
                var _this       = this;
                tmpCollection   = Backbone.Collection.extend({
                    model: Backbone.Model.extend(model)
                });
                _this.objCollection = new tmpCollection(data);
                return true;
            },

            toCollection: function() {
                return this.objCollection;
            }

        }));

        objs[key]       = new tmpModel();

    });

    return objs;

};