'use strict';

// Tribute Demo
// =============================================================

var tributeDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleTributes();
  },
  handleTributes: function handleTributes() {
    // basic
    var tribute1 = new Tribute({
      values: this.getNames()
    });
    tribute1.attach($('#tributeDemo1')[0]);

    // custom template
    var tribute2 = new Tribute({
      values: this.getNames(),
      menuItemTemplate: function menuItemTemplate(item) {
        return '<span class="user-avatar user-avatar-sm mr-2"><img src="' + item.original.avatar + '"></span> ' + item.string;
      }
    });
    tribute2.attach($('#tributeDemo2')[0]);

    // custom select template
    var tribute3 = new Tribute({
      values: this.getNames(),
      selectTemplate: function selectTemplate(item) {
        // function called on select that returns the content to insert
        return '<a href="#"><strong>@' + item.original.value + '</strong></a>';
      },
      menuItemTemplate: function menuItemTemplate(item) {
        return '<span class="user-avatar user-avatar-sm mr-2"><img src="' + item.original.avatar + '"></span> ' + item.string;
      }
    });
    tribute3.attach($('#tributeDemo3')[0]);
  },
  getNames: function getNames() {
    return [{
      key: 'Peeta Mellark',
      value: 'peetm',
      avatar: 'assets/images/avatars/uifaces1.jpg'
    }, {
      key: 'Cinna',
      value: 'cinnastyles',
      avatar: 'assets/images/avatars/uifaces2.jpg'
    }, {
      key: 'Rue',
      value: 'rue74',
      avatar: 'assets/images/avatars/uifaces3.jpg'
    }, {
      key: 'Foxface',
      value: 'Foxyweapons',
      avatar: 'assets/images/avatars/uifaces4.jpg'
    }, {
      key: 'Cato',
      value: 'catod2',
      avatar: 'assets/images/avatars/uifaces5.jpg'
    }, {
      key: 'Clove',
      value: 'clove74',
      avatar: 'assets/images/avatars/uifaces6.jpg'
    }, {
      key: 'Thresh',
      value: 'tmoney',
      avatar: 'assets/images/avatars/uifaces7.jpg'
    }, {
      key: 'Glimmer',
      value: 'glimmerofhope',
      avatar: 'assets/images/avatars/uifaces8.jpg'
    }, {
      key: 'Marvel',
      value: 'MarvelvsDC',
      avatar: 'assets/images/avatars/uifaces9.jpg'
    }, {
      key: 'Effie Trinket',
      value: 'effetiquette',
      avatar: 'assets/images/avatars/uifaces10.jpg'
    }, {
      key: 'Haymitch Abernathy ',
      value: 'heymentor',
      avatar: 'assets/images/avatars/uifaces11.jpg'
    }, {
      key: 'Gale Hawthorne',
      value: 'ghaw',
      avatar: 'assets/images/avatars/uifaces12.jpg'
    }, {
      key: 'Primrose Everdeen',
      value: 'primhealer',
      avatar: 'assets/images/avatars/uifaces13.jpg'
    }, {
      key: 'Madge Undersee',
      value: 'madfire',
      avatar: 'assets/images/avatars/uifaces14.jpg'
    }, {
      key: 'President Snow',
      value: 'panem_master',
      avatar: 'assets/images/avatars/uifaces15.jpg'
    }, {
      key: 'Finnick Odair',
      value: 'odaircpr',
      avatar: 'assets/images/avatars/uifaces16.jpg'
    }, {
      key: 'Mags',
      value: 'oldthunder',
      avatar: 'assets/images/avatars/uifaces17.jpg'
    }, {
      key: 'Johanna Mason',
      value: 'jmtrator',
      avatar: 'assets/images/avatars/uifaces18.jpg'
    }, {
      key: 'Beetee Latier',
      value: 'wire_guided',
      avatar: 'assets/images/avatars/uifaces19.jpg'
    }, {
      key: 'Wiress',
      value: 'finisher',
      avatar: 'assets/images/avatars/uifaces20.jpg'
    }, {
      key: 'Enobaria',
      value: 'blade_tooth',
      avatar: 'assets/images/avatars/uifaces1.jpg'
    }];
  }
};

tributeDemo.init();
