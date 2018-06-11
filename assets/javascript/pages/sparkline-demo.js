'use strict';

// jQuery Sparkline Demo
// =============================================================

var sparklineDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.lineChart();
    this.barChart();
    this.compositeLineChart();
    this.normalRangeChart();
    this.compositeChart();
    this.discreteChart();
    this.lineCustomChart();
    this.tristateChart();
    this.plotChart();
    this.bulletChart();
    this.pieChart();
    this.drawMouseSpeed();
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
  lineChart: function lineChart() {
    $('.sparkline').sparkline('html', {
      lineColor: this.getColor('teal'),
      fillColor: '#E0F8F4'
    });
  },
  barChart: function barChart() {
    $('.sparkbar').sparkline('html', {
      type: 'bar',
      barColor: this.getColor('teal'),
      negBarColor: this.getColor('red'),
      stackedBarColor: [this.getColor('teal'), this.getColor('purple'), this.getColor('blue'), this.getColor('yellow')]
    });
  },
  compositeLineChart: function compositeLineChart() {
    $('#compositeline').sparkline('html', {
      fillColor: false,
      changeRangeMin: 0,
      chartRangeMax: 10,
      lineColor: this.getColor('teal')
    });

    $('#compositeline').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
      composite: true,
      fillColor: false,
      lineColor: this.getColor('red'),
      changeRangeMin: 0,
      chartRangeMax: 10
    });
  },
  normalRangeChart: function normalRangeChart() {
    $('#normalline').sparkline('html', {
      fillColor: false,
      normalRangeMin: -1,
      normalRangeMax: 8,
      lineColor: this.getColor('teal'),
      normalRangeColor: this.getColor('grayLighter')
    });

    $('#normalExample').sparkline('html', {
      fillColor: false,
      normalRangeMin: 80,
      normalRangeMax: 95,
      normalRangeColor: this.getColor('orange')
    });
  },
  compositeChart: function compositeChart() {
    $('#compositebar').sparkline('html', {
      type: 'bar',
      barColor: this.getColor('teal')
    });
    $('#compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
      composite: true,
      fillColor: false,
      lineColor: this.getColor('red')
    });
  },
  discreteChart: function discreteChart() {
    $('.discrete1').sparkline('html', {
      type: 'discrete',
      lineColor: this.getColor('blue'),
      xwidth: 18
    });

    $('#discrete2').sparkline('html', {
      type: 'discrete',
      lineColor: this.getColor('blue'),
      thresholdColor: this.getColor('red'),
      thresholdValue: 4
    });
  },
  lineCustomChart: function lineCustomChart() {
    $('#linecustom').sparkline('html', {
      height: '1.5em',
      width: '8em',
      lineColor: this.getColor('teal'),
      fillColor: '#E7F6F4',
      minSpotColor: false,
      maxSpotColor: false,
      spotColor: this.getColor('yellow'),
      spotRadius: 3
    });
  },
  tristateChart: function tristateChart() {
    $('.sparktristate').sparkline('html', {
      type: 'tristate',
      posBarColor: this.getColor('teal'),
      negBarColor: this.getColor('red')
    });

    $('.sparktristatecols').sparkline('html', {
      type: 'tristate',
      colorMap: {
        '-2': this.getColor('red'),
        '-1': this.getColor('yellow'),
        '0': this.getColor('purple'),
        '1': this.getColor('teal'),
        '2': this.getColor('blue')
      }
    });
  },
  plotChart: function plotChart() {
    $('.sparkboxplot').sparkline('html', {
      type: 'box',
      lineColor: this.getColor('purple'),
      boxLineColor: this.getColor('purple'),
      whiskerColor: this.getColor('gray'),
      outlierLineColor: this.getColor('gray'),
      outlierFillColor: this.getColor('grayLight'),
      medianColor: this.getColor('red'),
      targetColor: this.getColor('yellow')
    });

    $('.sparkboxplotraw').sparkline([1, 3, 5, 8, 10, 15, 18], {
      type: 'box',
      raw: true,
      showOutliers: true,
      target: 6,
      lineColor: this.getColor('blue'),
      boxLineColor: this.getColor('blue'),
      whiskerColor: this.getColor('gray'),
      outlierLineColor: this.getColor('gray'),
      outlierFillColor: this.getColor('grayLighter'),
      medianColor: this.getColor('red'),
      targetColor: this.getColor('yellow')
    });
  },
  bulletChart: function bulletChart() {
    $('.sparkbullet').sparkline('html', {
      type: 'bullet',
      targetColor: this.getColor('red'),
      performanceColor: this.getColor('teal'),
      rangeColors: ['#C0F0E8', '#A1E9DD', '#82E2D2']
    });
  },
  pieChart: function pieChart() {
    $('.sparkpie').sparkline('html', {
      type: 'pie',
      height: '1.0em',
      sliceColors: [this.getColor('purple'), this.getColor('teal'), this.getColor('blue'), this.getColor('yellow')]
    });
  },


  /**
   ** Draw the little mouse speed animated graph
   ** This just attaches a handler to the mousemove event to see
   ** (roughly) how far the mouse has moved
   ** and then updates the display a couple of times a second via
   ** setTimeout()
   **/
  drawMouseSpeed: function drawMouseSpeed() {
    var self = this;
    var mrefreshinterval = 500; // update display every 500ms
    var mpoints_max = 30;
    var lastmousex = -1;
    var lastmousey = -1;
    var lastmousetime = void 0;
    var mousetravel = 0;
    var mpoints = [];

    $('html').mousemove(function (e) {
      var mousex = e.pageX;
      var mousey = e.pageY;
      if (lastmousex > -1) {
        mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
      }
      lastmousex = mousex;
      lastmousey = mousey;
    });

    var mdraw = function mdraw() {
      var md = new Date();
      var timenow = md.getTime();
      if (lastmousetime && lastmousetime != timenow) {
        var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
        mpoints.push(pps);

        if (mpoints.length > mpoints_max) {
          mpoints.splice(0, 1);
        }

        mousetravel = 0;
        $('#mousespeed').sparkline(mpoints, {
          width: mpoints.length * 2,
          tooltipSuffix: ' pixels per second',
          lineColor: self.getColor('teal'),
          fillColor: '#E0F8F4'
        });
      }
      lastmousetime = timenow;
      setTimeout(mdraw, mrefreshinterval);
    };

    // We could use setInterval instead, but I prefer to do it this way
    setTimeout(mdraw, mrefreshinterval);
  }
};

sparklineDemo.init();
