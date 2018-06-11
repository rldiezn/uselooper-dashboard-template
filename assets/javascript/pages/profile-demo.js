'use strict';

// Profile Demo
// =============================================================

var profileDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {
    // turn off aspect ratio to get better mobile view
    Chart.defaults.global.maintainAspectRatio = false;

    // event handlers
    this.achievementChart();
    this.handleFlatpickr();
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
  randomScalingFactor: function randomScalingFactor() {
    return 1.0 * Math.round(Math.random() * 100);
  },
  achievementChart: function achievementChart() {
    var self = this;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Total Tasks',
        borderColor: self.getColor('teal'),
        backgroundColor: self.getColor('teal'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }, {
        label: 'Completed Tasks',
        borderColor: self.getColor('purple'),
        backgroundColor: self.getColor('purple'),
        data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
      }]

      // init achievement chart
    };var canvas = $('#canvas-achievement')[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: { display: false },
        title: { display: false },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false
            },
            ticks: {
              stepSize: 20
            }
          }]
        }
      }
    });
  },
  handleFlatpickr: function handleFlatpickr() {
    flatpickr('#flatpickr', {
      inline: true,
      disableMobile: true,
      mode: 'range',
      dateFormat: 'Y-m-d'
    });

    $('#flatpickr').next().on('click', function (e) {
      e.stopPropagation();
    });
  }
};

profileDemo.init();
