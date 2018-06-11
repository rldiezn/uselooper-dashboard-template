'use strict';

// Dashboard Demo
// =============================================================

var dashboardDemo = {
    init: function init() {

        this.bindUIActions();
    },
    bindUIActions: function bindUIActions() {
        // turn off aspect ratio to get better mobile view
        Chart.defaults.global.maintainAspectRatio = false;

        // event handlers
        this.handleTasksChart();
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
        return 5 * Math.round(Math.random() * 100);
    },
    handleTasksChart: function handleTasksChart() {
        var self = this;
        var data = {
            labels: ['21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar'],
            datasets: [{
                backgroundColor: self.getColor('blue'),
                borderColor: self.getColor('blue'),
                borderWidth: 1,
                data: [self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor(), self.randomScalingFactor()]
            }]
            // init chart bar
        };var canvas = $('#completion-tasks')[0].getContext('2d');
        var chart = new Chart(canvas, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                legend: { display: false },
                title: { display: false },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            drawOnChartArea: false
                        },
                        ticks: {
                            maxRotation: 0,
                            maxTicksLimit: 3
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 100
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

dashboardDemo.init();
