'use strict';

// Colorpicker Demo
// =============================================================

var colorPickerDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleColorpicker();
  },
  _cp1: function _cp1() {
    // Simple input field
    $('#colorpicker1').colorpicker();
  },
  _cp2: function _cp2() {
    // As a component
    $('#colorpicker2').colorpicker();
  },
  _cp3: function _cp3() {
    // With custom options
    $('#colorpicker3').colorpicker({
      color: '#4D9DE0',
      format: 'rgb'
    });
  },
  _cp4: function _cp4() {
    // Disable alpha channel
    $('#colorpicker4').colorpicker({
      useAlpha: false
    });
  },
  _cp5: function _cp5() {
    // Transparent color support
    $('#colorpicker5').colorpicker({
      color: 'transparent',
      format: 'hex'
    });
  },
  _cp6: function _cp6() {
    // Horizontal mode
    $('#colorpicker6').colorpicker({
      color: '#C5906C',
      horizontal: true
    });
  },
  _cp7: function _cp7() {
    // Inline mode
    $('#colorpicker7').colorpicker({
      color: '#C56C6C',
      container: true,
      inline: true
    });
  },
  _cp8: function _cp8() {
    // Aliased color palette
    $('#colorpicker8').colorpicker({
      extensions: [{
        name: 'swatches',
        colors: {
          'black': '#000000',
          'white': '#ffffff',
          'red': '#FF0000',
          'default': '#777777',
          'primary': '#337ab7',
          'success': '#5cb85c',
          'info': '#5bc0de',
          'warning': '#f0ad4e',
          'danger': '#d9534f'
        },
        namesAsValues: true
      }]
    });
  },
  _cp9: function _cp9() {
    // Custom template
    $('#colorpicker9').colorpicker({
      inline: true,
      container: true,
      extensions: [],
      template: '<div class="colorpicker">\n        <div class="colorpicker-saturation"><i class="colorpicker-guide"><i></i></i></div>\n        <div class="colorpicker-hue"><i class="colorpicker-guide"></i></div>\n        <div class="colorpicker-alpha"><i class="colorpicker-guide"></i></div>\n        <div class="colorpicker-bar hsv-output"></div>\n      </div>'
    }).on('colorpickerChange colorpickerCreate', function (e) {
      var output = e.colorpicker.element.find('.hsv-output');
      output.html(e.color.toHsvString()).css('background-color', e.color.toRgbString());

      if (e.color.isDark()) {
        output.css('color', 'white');
      } else {
        output.css('color', 'black');
      }
    });
  },
  _cp10: function _cp10() {
    // Inside a modal
    $('#colorpicker10').colorpicker();
  },
  handleColorpicker: function handleColorpicker() {
    this._cp1();
    this._cp2();
    this._cp3();
    this._cp4();
    this._cp5();
    this._cp6();
    this._cp7();
    this._cp8();
    this._cp9();
    this._cp10();
  }
};

colorPickerDemo.init();
