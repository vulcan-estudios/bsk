module.exports = function() {

    $('body').on('click', '.file_upload__placeholder__delete', function(e) {
        e.preventDefault();
        var fileUpload  = $(this).parents('.file-upload');
        var inputReset  = fileUpload.parents('div:first').find('input');
        App.Modal.render('confirm', {
            title: 'Eliminar Imagen',
            description: 'Estás seguro de querer eliminar esta imagen cargada?',
            onAccept: function() {
                inputReset.val('');
                fileUpload.find('.file-upload__content:first').css({'background-image': 'none', 'height': 'auto'}).removeClass('has-image');
            }
        });
        return false;
    });

};