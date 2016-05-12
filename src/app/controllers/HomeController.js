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

    // Index
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

        console.log("entra al redirect");
        App.Router.to('home/list');

    }

};