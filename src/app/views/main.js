
/**
 * MAIN VIEW
 */
var Zurb        = require('libs/zurb/zurb');

module.exports  = {

    initialize: function() {
        this.render();
    },

    render: function() {

        // Append Header
        //this.header     = App.View.Component('header');
        //this.$el.append(this.header.el);

        // Append view
        this.$el.append(this.view.el);

        // Foundation Start
        Zurb.init();

    }

};
