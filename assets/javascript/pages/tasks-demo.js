'use strict';

// App Tasks Demo
// =============================================================

var tasksDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleBoardStyle();
    this.handleSortable();
  },
  byId: function byId(id) {
    return document.getElementById(id);
  },
  handleBoardStyle: function handleBoardStyle() {
    $(document).on('mouseenter mouseleave', '.task-header', function (e) {
      var isHover = e.type === 'mouseenter';
      $(this).parent().toggleClass('hover', isHover);
    });
  },
  handleSortable: function handleSortable() {
    var board = this.byId('board');
    // Multi groups
    Sortable.create(board, {
      animation: 150,
      draggable: '.tasks',
      handle: '.task-header',
      filter: '.ignore-sort',
      delay: 100,
      forceFallback: true
    });[].forEach.call(board.querySelectorAll('.task-body'), function (el) {
      Sortable.create(el, {
        group: 'tasks',
        animation: 150,
        filter: '.ignore-sort',
        delay: 100,
        forceFallback: true
      });
    });
  }
};

tasksDemo.init();
