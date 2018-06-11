'use strict';

// Sortable & Nestable Demo
// =============================================================

var sortNestDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleSortable();
    this.handleNestable();
  },
  byId: function byId(id) {
    return document.getElementById(id);
  },
  handleSortable: function handleSortable() {
    var $this = this;
    // Multi groups
    Sortable.create($this.byId('sortablemulti'), {
      animation: 150,
      draggable: '.sortable-tile',
      handle: '.drag-handle'
    });

    [].forEach.call($this.byId('sortablemulti').querySelectorAll('.sortable-lists'), function (el) {
      Sortable.create(el, {
        group: 'pages',
        animation: 150
      });
    });
  },
  handleNestable: function handleNestable() {
    var updateOutput = function updateOutput(e) {
      var list = e.length ? e : $(e.target);

      if (window.JSON) {
        $('#nestableOutput').text(window.JSON.stringify(list.nestable('serialize')));
      } else {
        $('#nestableOutput').text('JSON browser support required for this demo.');
      }
    };

    $('#nestable01').nestable({
      group: 1,
      maxDepth: 5
    }).on('change', updateOutput);

    $('#nestable02').nestable({
      group: 1,
      maxDepth: 5
    }).on('change', updateOutput);
  }
};

sortNestDemo.init();
