/**
 * Drag & Drop
 */

module.exports  =  {

    /**
     * Createa a drag & drop
     *
     * @param string handle class or attr to make draggable
     * @param jQuery container Wrapper to the list of element to drag
     * @param callback cb callback to exec after drag
     */
    init: function(handle, container, cb) {

        var list	= (container instanceof $) ? container[0] : document.getElementById(container.replace('#', ''));
        Sortable.create(list, {
            animation: 300,
            handle: (handle === undefined)  ? '.button-drag' : handle,
            onUpdate: function (evt) {
                cb($(container));
            }
        });

    }

};
