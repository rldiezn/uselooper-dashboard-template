'use strict';

// Quill Demo
// =============================================================

var quillDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleQuill();
  },
  handleQuill: function handleQuill() {
    new Quill('#quillEditor', {
      bounds: '#quillEditor',
      placeholder: 'Compose an epic...',
      modules: {
        'formula': true,
        'syntax': true,
        'toolbar': [[{ 'font': [] }, { 'size': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'color': [] }, { 'background': [] }], [{ 'script': 'super' }, { 'script': 'sub' }], [{ 'header': [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['direction', { 'align': [] }], ['link', 'image', 'video', 'formula'], ['clean']]
      },
      theme: 'snow'
    });
  }
};

quillDemo.init();
