'use strict';

// Chartjs Scatter Demo
// =============================================================

var chartjsScatterDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.scatterChart();
    this.scatterMultiAxisChart();
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
      gray: '#BEC1C4'
    };
  },
  getColor: function getColor(color) {
    return this.colors()[color];
  },
  colorNames: function colorNames(color) {
    return Object.keys(this.colors());
  },
  randomScalingFactor: function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  },
  randomScaling: function randomScaling() {
    return Math.round(Math.random() * 100);
  },
  months: function months() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  },
  scatterChart: function scatterChart() {
    var self = this;
    var data = {
      datasets: [{
        label: 'My First dataset',
        borderColor: self.getColor('purple'),
        backgroundColor: self.getColor('purple'),
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }]
      }, {
        label: 'My Second dataset',
        borderColor: self.getColor('teal'),
        backgroundColor: self.getColor('teal'),
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }]
      }]

      // init chart scatter
    };var canvas = $('#canvas-scatter')[0].getContext('2d');
    var chart = Chart.Scatter(canvas, {
      data: data,
      options: {
        title: {
          display: true,
          text: 'Scatter Chart'
        },
        legend: {
          display: false
        }
      }
    });
  },
  scatterMultiAxisChart: function scatterMultiAxisChart() {
    var self = this;
    var data = {
      datasets: [{
        label: 'My First dataset',
        xAxisID: 'x-axis-1',
        yAxisID: 'y-axis-1',
        borderColor: self.getColor('purple'),
        backgroundColor: self.getColor('purple'),
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }]
      }, {
        label: 'My Second dataset',
        xAxisID: 'x-axis-1',
        yAxisID: 'y-axis-2',
        borderColor: self.getColor('teal'),
        backgroundColor: self.getColor('teal'),
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor()
        }]
      }]

      // init chart scatter multi axis
    };var canvas = $('#canvas-scatter-multi-axis')[0].getContext('2d');
    var chart = Chart.Scatter(canvas, {
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        hoverMode: 'nearest',
        intersect: true,
        title: {
          display: true,
          text: 'Scatter Chart - Multi Axis'
        },
        scales: {
          xAxes: [{
            position: 'bottom',
            gridLines: {
              zeroLineColor: 'rgba(0,0,0,1)'
            }
          }],
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1'
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            reverse: true,
            id: 'y-axis-2',
            // grid line settings
            gridLines: {
              drawOnChartArea: false // only want the grid lines for one axis to show up
            }
          }]
        }
      }
    });
  }
};

chartjsScatterDemo.init();
