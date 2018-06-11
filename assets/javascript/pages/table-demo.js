'use strict';

// DataTables Demo
// =============================================================

var tableDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleSelecter();
  },
  handleSelecter: function handleSelecter() {
    var self = this;

    $(document).on('change', '#check-handle', function () {
      var isChecked = $(this).prop('checked');
      $('input[name="selectedRow[]"]').prop('checked', isChecked);

      // get info
      self.getSelectedInfo();
    }).on('change', 'input[name="selectedRow[]"]', function () {
      var $selectors = $('input[name="selectedRow[]"]');
      var $selectedRow = $('input[name="selectedRow[]"]:checked').length;
      var prop = $selectedRow === $selectors.length ? 'checked' : 'indeterminate';

      // reset props
      $('#check-handle').prop('indeterminate', false).prop('checked', false);

      if ($selectedRow) {
        $('#check-handle').prop(prop, true);
      }

      // get info
      self.getSelectedInfo();
    });
  },
  getSelectedInfo: function getSelectedInfo() {
    var $selectedRow = $('input[name="selectedRow[]"]:checked').length;
    var $info = $('.thead-btn');
    var $badge = $('<span/>').addClass('selected-row-info text-muted pl-1').text($selectedRow + ' selected');
    // remove existing info
    $('.selected-row-info').remove();
    // add current info
    if ($selectedRow) {
      $info.prepend($badge);
    }
  },
  clearSelectedRows: function clearSelectedRows() {
    $('#check-handle').prop('indeterminate', false).prop('checked', false).trigger('change');
  }
};

tableDemo.init();
