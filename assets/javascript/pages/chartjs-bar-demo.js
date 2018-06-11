'use strict';

// Chartjs Bar Demo
// =============================================================

var chartjsBarDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.barChart();
    this.barHorizontal();
    this.barStacked();
    this.barStackedGroup();
    this.barMultiAxis();
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
  barChart: function barChart() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: self.getColor('purple'),
        borderColor: self.getColor('purple'),
        borderWidth: 1,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 2',
        backgroundColor: self.getColor('teal'),
        borderColor: self.getColor('teal'),
        borderWidth: 1,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]
      // init chart bar
    };var canvas = $('#canvas-bar')[0].getContext('2d');
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
          text: 'Bar Chart'
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
    });

    // randomize data
    $('#randomizeData').on('click', function (e) {
      e.preventDefault();
      var zero = Math.random() < 0.2 ? true : false;
      data.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {
          return zero ? 0.0 : self.randomScalingFactor();
        });
      });
      chart.update();
    });

    // add data
    $('#addData').on('click', function (e) {
      e.preventDefault();
      if (data.datasets.length > 0) {
        var month = self.months()[data.labels.length % self.months().length];
        data.labels.push(month);
        for (var index = 0; index < data.datasets.length; ++index) {
          //chart.addData(self.randomScalingFactor(), index)
          data.datasets[index].data.push(self.randomScalingFactor());
        }
        chart.update();
      }
    });

    // remove data
    $('#removeData').on('click', function (e) {
      e.preventDefault();
      data.labels.splice(-1, 1); // remove the label first
      data.datasets.forEach(function (dataset, datasetIndex) {
        dataset.data.pop();
      });
      chart.update();
    });
  },
  barHorizontal: function barHorizontal() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: self.getColor('purple'),
        borderColor: self.getColor('purple'),
        borderWidth: 1,
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 2',
        backgroundColor: self.getColor('teal'),
        borderColor: self.getColor('teal'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]
      // init chart horizontal bar
    };var canvas = $('#canvas-horizontal-bar')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'horizontalBar',
      data: data,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Horizontal Bar Chart'
        }
      }
    });

    // randomize data
    $('#randomizeDataHorizontalBar').on('click', function (e) {
      e.preventDefault();
      var zero = Math.random() < 0.2 ? true : false;
      data.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {
          return zero ? 0.0 : self.randomScalingFactor();
        });
      });
      chart.update();
    });

    // add dataset
    $('#addDatasetHorizontalBar').on('click', function (e) {
      e.preventDefault();
      if (data.datasets.length <= 6) {
        var colorName = self.colorNames()[data.datasets.length % Object.keys(self.colors()).length];
        var dsColor = self.getColor(colorName);
        var newDataset = {
          label: 'Dataset ' + data.datasets.length,
          backgroundColor: dsColor,
          borderColor: dsColor,
          data: []
        };
        for (var index = 0; index < data.labels.length; ++index) {
          newDataset.data.push(self.randomScalingFactor());
        }
        data.datasets.push(newDataset);
        chart.update();
      }
    });

    // remove dataset
    $('#removeDatasetHorizontalBar').on('click', function () {
      data.datasets.splice(0, 1);
      chart.update();
    });
  },
  barStacked: function barStacked() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: self.getColor('blue'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 2',
        backgroundColor: self.getColor('teal'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 3',
        backgroundColor: self.getColor('purple'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]

      // init Chart Stacked Bar
    };var canvas = $('#canvas-stacked')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Stacked'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  },
  barStackedGroup: function barStackedGroup() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: self.getColor('purple'),
        stack: 'Stack 0',
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 2',
        backgroundColor: self.getColor('teal'),
        stack: 'Stack 0',
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 3',
        backgroundColor: self.getColor('teal'),
        stack: 'Stack 1',
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]
      // init chart stacked group bar
    };var canvas = $('#canvas-stacked-group')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Stacked Group'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  },
  barMultiAxis: function barMultiAxis() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: [self.getColor('purple'), self.getColor('orange'), self.getColor('green'), self.getColor('teal'), self.getColor('blue'), self.getColor('red'), self.getColor('purple')],
        yAxisID: 'y-axis-1',
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Dataset 2',
        backgroundColor: self.getColor('gray'),
        yAxisID: 'y-axis-2',
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]
    };
    var canvas = $('#canvas-multi-axis')[0].getContext('2d');
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
          text: 'Multi Axis'
        },
        tooltips: {
          mode: 'index',
          intersect: true
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
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }
};

chartjsBarDemo.init();
