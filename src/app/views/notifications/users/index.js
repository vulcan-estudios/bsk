var view        = _.template(require('./templates/index.html'));

module.exports  = {

    events: {
        'submit form': 'test'
    },

    render: function() {

        // Load the compiled HTML into the Backbone "el"
        this.html( view );

        // Load subviews
        //this.assign('subview', '.wrapper-user');

    },

    test: function(e) {
        e.preventDefault();
        console.log('Trigger event test');
        return false;
    }

};