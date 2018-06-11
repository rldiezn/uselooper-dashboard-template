'use strict';

// Plyr Demo
// =============================================================

var plyrDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handlePlyr();
  },
  handlePlyr: function handlePlyr() {
    // Audio
    var audio = new Plyr('#audio');
    // Video
    var video = new Plyr('#video');
    // Youtube
    var youtube = new Plyr('#youtube');
    // Vimeo
    var vimeo = new Plyr('#vimeo');

    // handle plyr controls
    $(document).on('click', '.controls-video > .btn', function () {
      var fn = $(this).data('plyr');
      video[0][fn]();
    })
    // controls youtube
    .on('click', '.controls-youtube > .btn', function () {
      var fn = $(this).data('plyr');
      youtube[0][fn]();
    })
    // controls vimeo
    .on('click', '.controls-vimeo > .btn', function () {
      var fn = $(this).data('plyr');
      vimeo[0][fn]();
    });
  }
};

plyrDemo.init();
