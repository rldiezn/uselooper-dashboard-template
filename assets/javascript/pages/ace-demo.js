'use strict';

// Ace Demo
// =============================================================

var aceDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleAceEditor();
  },
  handleAceEditor: function handleAceEditor() {
    var editor = ace.edit('aceEditor');
    var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
    // create a simple selection status indicator
    var statusBar = new StatusBar(editor, document.getElementById('statusBar'));

    editor.setTheme('ace/theme/chrome');
    editor.session.setMode('ace/mode/javascript');
    editor.setAutoScrollEditorIntoView(true);
    editor.setFontSize('14px');
  }
};

aceDemo.init();
