'use strict';

// Chartjs Other Demo
// =============================================================

var chartjsOtherDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.dataLabellingChart();
    this.comboBarLineChart();
    this.bubbleChart();
    this.polarAreaChart();
    this.pieChart();
    this.doughnutChart();
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
  dataLabellingChart: function dataLabellingChart() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        type: 'bar',
        label: 'Dataset 1',
        backgroundColor: Chart.helpers.color(self.getColor('purple')).alpha(0.2).rgbString(),
        borderColor: self.getColor('purple'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        type: 'line',
        label: 'Dataset 2',
        backgroundColor: Chart.helpers.color(self.getColor('green')).alpha(0.2).rgbString(),
        borderColor: self.getColor('green'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: Chart.helpers.color(self.getColor('teal')).alpha(0.2).rgbString(),
        borderColor: self.getColor('teal'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]

      // Define a plugin to provide data labels
    };Chart.plugins.register({
      afterDatasetsDraw: function afterDatasetsDraw(chartInstance, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chartInstance.chart.ctx;

        chartInstance.data.datasets.forEach(function (dataset, i) {
          // labelling only first chart
          if (chartInstance.id > 0) {
            return;
          }

          var meta = chartInstance.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function (element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = '#686F76';

              var fontSize = 12;
              var fontStyle = 'normal';
              var fontFamily = 'inherit';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              var dataString = dataset.data[index].toString();

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              var padding = 5;
              var position = element.tooltipPosition();
              ctx.fillText(dataString, position.x, position.y - fontSize / 2 - padding);
            });
          }
        });
      }
    });

    // init chart data labelling
    var canvas = $('#canvas-data-labelling')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Data Labelling'
        }
      }
    });
  },
  comboBarLineChart: function comboBarLineChart() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: self.getColor('teal'),
        borderWidth: 2,
        fill: false,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: self.getColor('red'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
        borderColor: 'white',
        borderWidth: 2
      }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: self.getColor('purple'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]

      // init chart combo bar line
    };var canvas = $('#canvas-combo-bar-line')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Combo Bar Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: true
        }
      }
    });
  },
  bubbleChart: function bubbleChart() {
    var self = this;
    var DEFAULT_DATASET_SIZE = 7;
    var addedCount = 2;
    var data = {
      animation: {
        duration: 10000
      },
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: Chart.helpers.color(self.getColor('purple')).alpha(0.5).rgbString(),
        borderColor: self.getColor('purple'),
        borderWidth: 1,
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }]
      }, {
        label: 'Dataset 2',
        backgroundColor: Chart.helpers.color(self.getColor('teal')).alpha(0.5).rgbString(),
        borderColor: self.getColor('teal'),
        borderWidth: 1,
        data: [{
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }, {
          x: self.randomScalingFactor(),
          y: self.randomScalingFactor(),
          r: Math.abs(self.randomScalingFactor()) / 5
        }]
      }]

      // init chart bubble
    };var canvas = $('#canvas-bubble')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bubble',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Bubble Chart'
        },
        tooltips: {
          mode: 'point'
        }
      }
    });
  },
  polarAreaChart: function polarAreaChart() {
    var self = this;
    var data = {
      data: {
        datasets: [{
          data: [self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling()],
          backgroundColor: [Chart.helpers.color(self.getColor('red')).alpha(0.5).rgbString(), Chart.helpers.color(self.getColor('purple')).alpha(0.5).rgbString(), Chart.helpers.color(self.getColor('yellow')).alpha(0.5).rgbString(), Chart.helpers.color(self.getColor('teal')).alpha(0.5).rgbString(), Chart.helpers.color(self.getColor('blue')).alpha(0.5).rgbString()],
          label: 'My dataset' // for legend
        }],
        labels: ['Red', 'Purple', 'Yellow', 'Green', 'Blue']
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Polar Area Chart'
        },
        scale: {
          ticks: {
            beginAtZero: true
          },
          reverse: false
        },
        animation: {
          animateRotate: false,
          animateScale: true
        }
      }

      // init chart polar area
    };var canvas = $('#canvas-polar-area')[0].getContext('2d');
    var chart = Chart.PolarArea(canvas, data);
  },
  pieChart: function pieChart() {
    var self = this;
    var data = {
      type: 'pie',
      data: {
        datasets: [{
          data: [self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling()],
          backgroundColor: [self.getColor('red'), self.getColor('purple'), self.getColor('yellow'), self.getColor('teal'), self.getColor('blue')],
          label: 'Dataset 1'
        }],
        labels: ['Red', 'Purple', 'Yellow', 'Green', 'Blue']
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Pie Chart'
        }
      }

      // init chart pie
    };var canvas = $('#canvas-pie')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  },
  doughnutChart: function doughnutChart() {
    var self = this;
    var data = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling()],
          backgroundColor: [self.getColor('red'), self.getColor('purple'), self.getColor('yellow'), self.getColor('teal'), self.getColor('blue')],
          label: 'Dataset 1'
        }],
        labels: ['Red', 'Purple', 'Yellow', 'Green', 'Blue']
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Doughnut Chart'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }

      // init chart doughnut
    };var canvas = $('#canvas-doughnut')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  }
};

chartjsOtherDemo.init();
