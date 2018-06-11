'use strict';

// Chartjs Radar Demo
// =============================================================

var chartjsRadarDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.radarChart();
    this.radarSkipPointChart();
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
  radarChart: function radarChart() {
    var self = this;
    var data = {
      type: 'radar',
      data: {
        labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: Chart.helpers.color(self.getColor('purple')).alpha(0.2).rgbString(),
          borderColor: self.getColor('purple'),
          pointBackgroundColor: self.getColor('purple'),
          data: [self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling()]
        }, {
          label: 'My Second dataset',
          backgroundColor: Chart.helpers.color(self.getColor('teal')).alpha(0.2).rgbString(),
          borderColor: self.getColor('teal'),
          pointBackgroundColor: self.getColor('teal'),
          data: [self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling(), self.randomScaling()]
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Radar Chart'
        },
        scale: {
          ticks: {
            beginAtZero: true
          }
        }
      }

      // init chart radar
    };var chart = new Chart($('#canvas-radar')[0], data);
  },
  radarSkipPointChart: function radarSkipPointChart() {
    var self = this;
    var data = {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'Skip first dataset',
          borderColor: self.getColor('purple'),
          backgroundColor: Chart.helpers.color(self.getColor('purple')).alpha(0.2).rgbString(),
          pointBackgroundColor: self.getColor('purple'),
          data: [NaN, self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }, {
          label: 'Skip mid dataset',
          borderColor: self.getColor('blue'),
          backgroundColor: Chart.helpers.color(self.getColor('blue')).alpha(0.2).rgbString(),
          pointBackgroundColor: self.getColor('blue'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), NaN, self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
        }, {
          label: 'Skip last dataset',
          borderColor: self.getColor('teal'),
          backgroundColor: Chart.helpers.color(self.getColor('teal')).alpha(0.2).rgbString(),
          pointBackgroundColor: self.getColor('teal'),
          data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), NaN]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Skip Points'
        },
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0.0
          }
        },
        scale: {
          beginAtZero: true
        }
      }

      // init chart skip points radar
    };var chart = new Chart($('#canvas-radar-skip-points')[0], data);
  }
};

chartjsRadarDemo.init();
