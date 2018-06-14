'use strict';

// Simplemde Demo
// =============================================================

var simpleMDEDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleSimpleMDE();
  },
  handleSimpleMDE: function handleSimpleMDE() {
    new SimpleMDE({
      element: $('#simplemde')[0],
      spellChecker: false,
      autosave: {
        enabled: true,
        unique_id: 'SimpleMDEDemo'
      }
    });
  }
};

simpleMDEDemo.init();
