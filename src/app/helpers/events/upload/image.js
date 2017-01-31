module.exports = function() {

    $('body').on('click', '.file_upload__placeholder__delete', function(e) {
        e.preventDefault();
        var fileUpload  = $(this).parents('.file-upload');
        var inputReset  = fileUpload.parents('div:first').find('input');
        var type        = fileUpload.find('.has-image').size() > 0 ? 'image' : 'file';
        App.Modal.render('confirm', {
            title: (type === 'image') ? 'Eliminar Imagen' : 'Eliminar Archivo',
            description: (type === 'image') ? 'Estás seguro de querer eliminar esta imagen cargada?' : 'Estás seguro de querer eliminar este archivo cargado?',
            onAccept: function() {
                inputReset.val('').trigger('change');
                if(type === 'image') {
                    fileUpload.find('.file-upload__content:first').css({'background-image': 'none', 'height': 'auto'}).removeClass('has-image');
                } else {
                    fileUpload.find('.file-upload__content:first').removeClass('has-file');
                    fileUpload.find('.file-upload__placeholder__msg').html('Arrastra o selecciona un archivo');
                }
            }
        });
        return false;
    });

};