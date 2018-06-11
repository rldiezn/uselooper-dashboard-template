'use strict';

// Chartjs Line Demo
// =============================================================

var chartjsLineDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.lineChart();
    this.stackedArea();
    this.lineStyles();
    this.lineStepped();
    this.lineSkipPoint();
    this.lineDifferentPointSizes();
    this.lineMultiAxis();
    this.lineInterpolation();
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
  months: function months() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  },
  lineChart: function lineChart() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Data 1',
          backgroundColor: self.getColor('purple'),
          borderColor: self.getColor('purple'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          fill: false
        }, {
          label: 'Data 2',
          fill: false,
          backgroundColor: self.getColor('teal'),
          borderColor: self.getColor('teal'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 5
            }
          }]
        }
      }

      // init chart line
    };var canvas = $('#canvas-line')[0].getContext('2d');
    var chart = new Chart(canvas, data);

    // randomize data
    $('#randomizeData').on('click', function (e) {
      e.preventDefault();
      data.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {
          return self.randomScalingFactor();
        });
      });
      chart.update();
    });

    // add data
    $('#addData').on('click', function (e) {
      e.preventDefault();
      if (data.data.datasets.length > 0) {
        var month = self.months()[data.data.labels.length % self.months().length];
        data.data.labels.push(month);
        data.data.datasets.forEach(function (dataset) {
          dataset.data.push(self.randomScalingFactor());
        });
        chart.update();
      }
    });

    // remove data
    $('#removeData').on('click', function (e) {
      e.preventDefault();
      data.data.labels.splice(-1, 1); // remove the label first
      data.data.datasets.forEach(function (dataset, datasetIndex) {
        dataset.data.pop();
      });
      chart.update();
    });
  },
  stackedArea: function stackedArea() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Data 1',
          borderColor: self.getColor('purple'),
          backgroundColor: self.getColor('purple'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }, {
          label: 'Data 2',
          borderColor: self.getColor('teal'),
          backgroundColor: self.getColor('teal'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Stacked Area'
        },
        tooltips: {
          mode: 'index',
          position: 'nearest'
        },
        hover: {
          mode: 'index'
        },
        scales: {
          yAxes: [{
            stacked: true
          }]
        }
      }

      // init chart line stacked area
    };var canvas = $('#canvas-stacked-area')[0].getContext('2d');
    var chart = new Chart(canvas, data);

    // randomize data
    $('#randomizeDataStackedArea').on('click', function (e) {
      e.preventDefault();
      data.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {
          return self.randomScalingFactor();
        });
      });
      chart.update();
    });

    // add dataset
    $('#addDatasetStackedArea').on('click', function (e) {
      e.preventDefault();
      if (data.data.datasets.length <= 8) {
        var colorName = self.colorNames()[data.data.datasets.length % Object.keys(self.colors()).length];
        var newColor = self.getColor(colorName);
        var newDataset = {
          label: 'Dataset ' + data.data.datasets.length,
          borderColor: newColor,
          backgroundColor: newColor,
          data: []
        };
        for (var index = 0; index < data.data.labels.length; ++index) {
          newDataset.data.push(self.randomScalingFactor());
        }
        data.data.datasets.push(newDataset);
        chart.update();
      }
    });

    // remove dataset
    $('#removeDatasetStackedArea').on('click', function (e) {
      e.preventDefault();
      data.data.datasets.splice(0, 1);
      chart.update();
    });
  },
  lineStyles: function lineStyles() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Unfilled',
          fill: false,
          backgroundColor: self.getColor('blue'),
          borderColor: self.getColor('blue'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }, {
          label: 'Dashed',
          fill: false,
          backgroundColor: self.getColor('teal'),
          borderColor: self.getColor('teal'),
          borderDash: [5, 5],
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }, {
          label: 'Filled',
          backgroundColor: self.getColor('purple'),
          borderColor: self.getColor('purple'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          fill: true
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Line Styles'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
      // init chart line styles
    };var canvas = $('#canvas-styles')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  },
  lineStepped: function lineStepped() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'My First dataset',
          borderColor: self.getColor('purple'),
          backgroundColor: self.getColor('purple'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          fill: false,
          steppedLine: true
        }, {
          label: 'My Second dataset',
          steppedLine: true,
          borderColor: self.getColor('teal'),
          backgroundColor: self.getColor('teal'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          fill: false
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Line Stepped'
        },
        tooltips: {
          mode: 'index'
        }
      }
      // init chart line stepped
    };var canvas = $('#canvas-stepped')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  },
  lineSkipPoint: function lineSkipPoint() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'My First dataset',
          borderColor: self.getColor('purple'),
          fill: false,
          // Skip a point in the middle
          data: [self.randomScalingFactor(), self.randomScalingFactor(), NaN, self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]

        }, {
          label: 'My Second dataset',
          borderColor: self.getColor('teal'),
          fill: false,
          // Skip first and last points
          data: [NaN, self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), NaN]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Skip Points'
        },
        tooltips: {
          mode: 'index'
        },
        hover: {
          mode: 'index'
        }
      }

      // init chart line skip points
    };var canvas = $('#canvas-skip-points')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  },
  lineDifferentPointSizes: function lineDifferentPointSizes() {
    var self = this;
    var data = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'dataset - big points',
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          backgroundColor: self.getColor('purple'),
          borderColor: self.getColor('purple'),
          fill: false,
          borderDash: [5, 5],
          pointRadius: 15,
          pointHoverRadius: 10
        }, {
          label: 'dataset - individual point sizes',
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          backgroundColor: self.getColor('teal'),
          borderColor: self.getColor('teal'),
          fill: false,
          borderDash: [5, 5],
          pointRadius: [2, 4, 6, 18, 0, 12, 20]
        }, {
          label: 'dataset - large pointHoverRadius',
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
          backgroundColor: self.getColor('blue'),
          borderColor: self.getColor('blue'),
          fill: false,
          pointHoverRadius: 30
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        hover: {
          mode: 'index'
        },
        title: {
          display: true,
          text: 'Different point sizes'
        }
      }

      // init chart line different point sizes
    };var canvas = $('#canvas-different-point-sizes')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  },
  lineMultiAxis: function lineMultiAxis() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'My First dataset',
        borderColor: self.getColor('purple'),
        backgroundColor: self.getColor('purple'),
        fill: false,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
        yAxisID: 'y-axis-1'
      }, {
        label: 'My Second dataset',
        borderColor: self.getColor('teal'),
        backgroundColor: self.getColor('teal'),
        fill: false,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()],
        yAxisID: 'y-axis-2'
      }]

      // init chart line multi axis
    };var canvas = $('#canvas-multi-axis')[0].getContext('2d');
    var chart = Chart.Line(canvas, {
      data: data,
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Multi Axis'
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1'
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false // only want the grid lines for one axis to show up
            }
          }]
        }
      }
    });
  },
  lineInterpolation: function lineInterpolation() {
    var self = this;
    var datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
    var data = {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          label: 'Monotone',
          data: datapoints,
          borderColor: self.getColor('purple'),
          backgroundColor: self.getColor('purple'),
          fill: false,
          cubicInterpolationMode: 'monotone'
        }, {
          label: 'Default',
          data: datapoints,
          borderColor: self.getColor('blue'),
          backgroundColor: self.getColor('blue'),
          fill: false
        }, {
          label: 'Linear',
          data: datapoints,
          borderColor: self.getColor('teal'),
          backgroundColor: self.getColor('teal'),
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Cubic interpolation mode'
        },
        tooltips: {
          mode: 'index'
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: -10,
              suggestedMax: 200
            }
          }]
        }
      }

      // init chart line multi axis
    };var canvas = $('#canvas-interpolation-modes')[0].getContext('2d');
    var chart = new Chart(canvas, data);
  }
};

chartjsLineDemo.init();
