'use strict';

// Profile Settings Demo
// =============================================================

var profileSettingsDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleFileUploadAvatar();
  },
  handleFileUploadAvatar: function handleFileUploadAvatar() {
    // Change this to the location of your server-side upload handler:
    var url = '//jquery-file-upload.appspot.com/';
    // const url = (window.location.hostname === 'blueimp.github.io') ? '//jquery-file-upload.appspot.com/' : 'server/php/'
    var $container = $('#fileupload-avatar').parents('.card-body');
    var $avatarWarningContainer = $('<div>').addClass('alert alert-danger alert-dismissible');
    var closeBtn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>';

    // file upload avatar
    $('#fileupload-avatar').fileupload({
      url: url,
      dropZone: null,
      dataType: 'json',
      autoUpload: true,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      maxFileSize: 2000000
    }).on('fileuploadprocessalways', function (e, data) {
      var index = data.index;
      var file = data.files[index];

      $avatarWarningContainer.remove();

      if (file.error) {
        $avatarWarningContainer.text(file.error).prepend(closeBtn);
        $container.prepend($avatarWarningContainer);
      }
    }).on('fileuploadprogressall', function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);

      $('#progress-avatar').addClass('show').children().css('width', progress + '%');
    }).on('fileuploaddone', function (e, data) {
      var file = data.result.files[0];
      var $img = $(this).parent().children('img');
      var $old = $img.prop('src');

      if (file.url) {
        $img.prop('src', file.url);

        // update your db
      } else if (file.error) {
        $avatarWarningContainer.text(file.error).prepend(closeBtn);
        $container.prepend($avatarWarningContainer);
      }

      $('#progress-avatar').removeClass('show').children().css('width', 0);
    });
  }
};

profileSettingsDemo.init();
