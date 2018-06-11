'use strict';

// DataTables Demo
// =============================================================

var dataTablesDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.table = this.handleDataTables();
    this.handleSearchRecords();
    this.handleSelecter();
    this.handleClearSelected();

    // add buttons
    this.table.buttons().container().appendTo('#dt-buttons').unwrap();
  },
  handleDataTables: function handleDataTables() {
    return $('#myTable').DataTable({
      dom: '<\'text-muted\'Bi>\n        <\'table-responsive\'tr>\n        <\'mt-4\'p>',
      buttons: ['copyHtml5', { extend: 'print', autoPrint: false }],
      language: {
        paginate: {
          previous: '<i class="fa fa-lg fa-angle-left"></i>',
          next: '<i class="fa fa-lg fa-angle-right"></i>'
        }
      },
      autoWidth: false,
      ajax: 'assets/data/products.json',
      deferRender: true,
      order: [1, 'asc'],
      columns: [{ data: 'id', className: 'col-checker align-middle', orderable: false, searchable: false }, { data: 'name', className: 'align-middle' }, { data: 'inventory', className: 'align-middle' }, { data: 'variant', className: 'align-middle' }, { data: 'prices', className: 'align-middle' }, { data: 'sales', className: 'align-middle' }, { data: 'id', className: 'align-middle text-right', orderable: false, searchable: false }],
      columnDefs: [{
        targets: 0,
        render: function render(data, type, row, meta) {
          return '<div class="custom-control custom-control-nolabel custom-checkbox">\n            <input type="checkbox" class="custom-control-input" name="selectedRow[]" id="p' + row.id + '" value="' + row.id + '">\n            <label class="custom-control-label" for="p' + row.id + '"></label>\n          </div>';
        }
      }, {
        targets: 1,
        render: function render(data, type, row, meta) {
          return '<a href="#' + row.id + '" class="tile tile-img mr-1">\n            <img class="img-fluid" src="assets/images/dummy/img-' + row.img + '.jpg" alt="Card image cap">\n          </a>\n          <a href="#' + row.id + '">' + row.name + '</a>';
        }
      }, {
        targets: 6,
        render: function render(data, type, row, meta) {
          return '<a class="btn btn-sm btn-secondary" href="#' + data + '"><i class="fa fa-pencil-alt"></i></a>\n          <a class="btn btn-sm btn-secondary" href="#' + data + '"><i class="far fa-trash-alt"></i></a>';
        }
      }]
    });
  },
  handleSearchRecords: function handleSearchRecords() {
    var self = this;

    $('#table-search, #filterBy').on('keyup change focus', function (e) {
      var filterBy = $('#filterBy').val();
      var hasFilter = filterBy !== '';
      var value = $('#table-search').val();

      // clear selected rows
      if (value.length && (e.type === 'keyup' || e.type === 'change')) {
        self.clearSelectedRows();
      }

      // reset search term
      self.table.search('').columns().search('').draw();

      if (hasFilter) {
        self.table.columns(filterBy).search(value).draw();
      } else {
        self.table.search(value).draw();
      }
    });
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
  handleClearSelected: function handleClearSelected() {
    var self = this;
    // clear selected rows
    $('#myTable').on('page.dt', function () {
      self.clearSelectedRows();
    });
    $('#clear-search').on('click', function () {
      self.clearSelectedRows();
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

dataTablesDemo.init();
