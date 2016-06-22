
/**
 * MAIN VIEW
 */
var Zurb        = require('libs/zurb/zurb');
var Bind        = require('helpers/form/bind');

module.exports  = {

    // Array with views loaded
    viewsLoaded: [],

    //
    // Initialize
    //
    initialize: function() {

        this.render();

    },

    //
    // Render
    //
    render: function() {

        this.clean();

        // Load Header
        //this.header     = App.View.Component('header');

        // Push to views loaded
        //this.viewsLoaded.push(this.header);
        this.viewsLoaded.push(this.view);


        // Append Header
        //this.$el.append(this.header.el);

        // Append view
        this.$el.append(this.view.el);

        // Foundation Start
        Zurb.init();

        // Bind Form components
        Bind.init();

        return this;

    },

    //
    // Clean View
    //
    clean: function() {

        // Remove all views loaded previously
        this.viewsLoaded.forEach(function(view) {
            view.remove();
        });

        // COMPLETELY UNBIND THE VIEW
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.$el.empty();

    }

};
