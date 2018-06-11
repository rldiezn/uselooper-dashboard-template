'use strict';

// jQuery EasyPieChart Demo
// =============================================================

var easypiechartDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleEasyPieChart();
  },
  colors: function colors() {
    return {
      red: '#B76BA3',
      orange: '#EC935E',
      yellow: '#F7C46C',
      green: '#A7C796',
      teal: '#00A28A',
      blue: '#346CB0',
      purple: '#5F4B8B',
      gray: '#BEC1C4',
      grayLight: '#D4D5D7',
      grayLighter: '#F5F5F5'
    };
  },
  getColor: function getColor(color) {
    return this.colors()[color];
  },
  handleEasyPieChart: function handleEasyPieChart() {
    var self = this;

    $('.easyPieChart').each(function () {
      var $this = $(this);
      var barColor = $this.attr('data-barColor');
      var trackColor = $this.attr('data-trackColor');
      var scaleColor = $this.attr('data-scaleColor');
      var lineWidth = $this.attr('data-lineWidth');
      var size = $this.attr('data-size');
      var rotate = $this.attr('data-rotate');

      // default for undefined
      barColor = barColor || self.getColor('teal');
      trackColor = trackColor || self.getColor('grayLighter');
      scaleColor = scaleColor || self.getColor('grayLight');
      lineWidth = lineWidth ? parseInt(lineWidth) : 8;
      size = size ? parseInt(size) : 120;
      rotate = rotate ? parseInt(rotate) : 0;

      trackColor = trackColor == 'false' || trackColor == '' ? false : trackColor;
      scaleColor = scaleColor == 'false' || scaleColor == '' ? false : scaleColor;

      // initilize easy pie chart
      $this.easyPieChart({
        barColor: barColor,
        trackColor: trackColor,
        scaleColor: scaleColor,
        lineWidth: lineWidth,
        size: size,
        rotate: rotate,
        onStep: function onStep(from, to, currentValue) {
          $(this.el).find('span').text(currentValue.toFixed(0) + '%');
        }
      });
    });
  }
};

easypiechartDemo.init();
