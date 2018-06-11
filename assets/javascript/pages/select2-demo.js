'use strict';

// Select2 Demo
// =============================================================

var select2Demo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // responsive setting
    $.fn.select2.defaults.set('width', '100%');

    // event handlers
    this.singleSelect();
    this.multipleSelect();
    this.arrayData();
    this.remoteData();
    this.tagging();
    this.disableMode();
  },
  getStates: function getStates() {
    return $('#select2-source-states').html();
  },
  singleSelect: function singleSelect() {
    $('#select2-basic-single').append(this.getStates());
    $('#select2-basic-single').select2({
      placeholder: 'Select a state',
      allowClear: true
    });
  },
  multipleSelect: function multipleSelect() {
    $('#select2-basic-multiple').append(this.getStates());
    $('#select2-basic-multiple').select2({
      placeholder: 'Select a state',
      maximumSelectionLength: 4
    });
  },
  arrayData: function arrayData() {
    var data = [{ id: 0, text: 'Visa' }, { id: 1, text: 'Discover Card' }, { id: 2, text: 'American Express' }, { id: 3, text: 'MasterCard' }, { id: 4, text: 'American Express' }];

    $('#select2-data-array').select2({
      data: data,
      minimumResultsForSearch: Infinity
    });
  },
  remoteData: function remoteData() {
    var formatRepo = function formatRepo(repo) {
      if (repo.loading) return repo.text;

      var markup = '<div class="media">' + '<div class="user-avatar mr-2"><img src="' + repo.owner.avatar_url + '" /></div>' + '<div class="media-body">' + '<h6 class="my-0">' + repo.full_name + '</h6>';

      if (repo.description) {
        markup += '<div class="small text-muted">' + repo.description + '</div>';
      }

      markup += '<ul class="list-inline small text-muted">' + '<li class="list-inline-item"><i class="fa fa-flash"></i> ' + repo.forks_count + ' Forks</li>' + '<li class="list-inline-item"><i class="fa fa-star"></i> ' + repo.stargazers_count + ' Stars</li>' + '<li class="list-inline-item"><i class="fa fa-eye"></i> ' + repo.watchers_count + ' Watchers</li>' + '</ul>' + '</div></div>';

      return markup;
    };

    var formatRepoSelection = function formatRepoSelection(repo) {
      return '<div class="user-avatar user-avatar-xs mr-2"><img src="' + repo.owner.avatar_url + '" /></div>' + repo.full_name || repo.text;
    };

    $('#select2-data-remote').select2({
      ajax: {
        url: 'https://api.github.com/search/repositories',
        dataType: 'json',
        delay: 250,
        data: function data(params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function processResults(data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;

          return {
            results: data.items,
            pagination: {
              more: params.page * 30 < data.total_count
            }
          };
        },
        cache: true
      },
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      minimumInputLength: 1,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection
    });
  },
  tagging: function tagging() {
    var data = ['SandyBrown', 'GhostWhite', 'LightSalmon', 'Bisque', 'LightSlateGray', 'PaleTurquoise', 'MediumVioletRed', 'LightSteelBlue', 'MidnightBlue', 'Peru', 'CornflowerBlue', 'DimGray', 'LightPink', 'Lime', 'Cornsilk', 'Cyan', 'DeepPink', 'BurlyWood', 'LightBlue', 'Fuchsia', 'LightGoldenRodYellow', 'PaleGoldenRod', 'DarkSalmon', 'Darkorange', 'Orange', 'FloralWhite', 'Ivory', 'Pink', 'Teal', 'Tan', 'LightCoral', 'ForestGreen', 'LimeGreen', 'Chocolate', 'Linen', 'RosyBrown', 'DarkTurquoise', 'DarkOrchid', 'DarkBlue', 'Magenta', 'SeaGreen', 'DarkRed', 'DarkSlateGray', 'SaddleBrown', 'DarkMagenta', 'Gray', 'Azure', 'Black', 'DarkKhaki', 'Lavender', 'Maroon', 'Orchid', 'DarkSeaGreen', 'Gainsboro', 'Brown', 'Khaki', 'MediumSeaGreen', 'LightYellow', 'Salmon', 'MediumTurquoise', 'IndianRed', 'AntiqueWhite', 'SpringGreen', 'MistyRose', 'DarkOliveGreen', 'Thistle', 'Violet', 'Olive', 'Crimson', 'BlanchedAlmond', 'PowderBlue', 'SlateGray', 'LawnGreen', 'MintCream', 'LightGreen', 'LightSkyBlue', 'Yellow', 'Indigo', 'HotPink', 'WhiteSmoke', 'Gold', 'BlueViolet', 'LavenderBlush', 'OliveDrab', 'PeachPuff', 'OldLace', 'GreenYellow', 'Navy', 'Aquamarine', 'DarkSlateBlue', 'Purple', 'PaleGreen', 'SteelBlue', 'Blue', 'Coral', 'PaleVioletRed', 'RoyalBlue', 'Turquoise', 'MediumOrchid', 'Green', 'Sienna', 'DarkGray', 'DodgerBlue', 'SlateBlue', 'LightGray', 'DarkGoldenRod', 'SkyBlue', 'LightSeaGreen', 'GoldenRod', 'Snow', 'YellowGreen', 'CadetBlue', 'PapayaWhip', 'DeepSkyBlue', 'LemonChiffon', 'DimGrey', 'MediumSpringGreen', 'HoneyDew', 'Plum', 'Silver', 'MediumBlue', 'Aqua', 'Chartreuse', 'FireBrick', 'Beige', 'SeaShell', 'Wheat', 'AliceBlue', 'MediumPurple', 'OrangeRed', 'DarkGreen', 'Moccasin', 'NavajoWhite', 'DarkCyan', 'MediumAquaMarine', 'Red', 'DarkViolet', 'LightCyan', 'MediumSlateBlue'];
    $('#select2-tagging').select2({
      tags: data,
      tokenSeparators: [',', ' ']
    });
  },
  disableMode: function disableMode() {
    $('#select2-disabled-mode1, #select2-disabled-mode2').select2({
      placeholder: 'Select a state'
    });
  }
};

select2Demo.init();
