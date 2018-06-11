'use strict';

// jQuery Knob Demo
// =============================================================

var knobDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleKnob();
    this.infiniteKnob();
  },
  handleKnob: function handleKnob() {
    $('.knob').knob({
      change: function change(value) {
        console.log('change : ' + value);
      },
      release: function release(value) {
        console.log('release : ' + value);
      },
      cancel: function cancel() {
        console.log('cancel : ', this);
      },
      // format : function (value) {
      //  return value + '%'
      // },
      draw: function draw() {
        // 'tron' case
        if (this.$.data('skin') == 'tron') {
          this.cursorExt = 0.3;
          var a = this.arc(this.cv); // Arc
          var pa = void 0; // Previous arc
          var r = 1;

          this.g.lineWidth = this.lineWidth;

          if (this.o.displayPrevious) {
            pa = this.arc(this.v);
            this.g.beginPath();
            this.g.strokeStyle = this.pColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
            this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
        }
      }
    });
  },
  infiniteKnob: function infiniteKnob() {
    // Example of infinite knob, iPod click wheel
    var $idir = $('div.idir');
    var $ival = $('div.ival');
    var v = void 0,
        up = 0;
    var down = 0;
    var i = 0;
    var incr = function incr() {
      i++;
      $idir.show().html('+').fadeOut();
      $ival.html(i);
    };
    var decr = function decr() {
      i--;
      $idir.show().html('-').fadeOut();
      $ival.html(i);
    };

    $('input.infinite').knob({
      min: 0,
      max: 20,
      stopper: false,
      change: function change() {
        if (v > this.cv) {
          if (up) {
            decr();
            up = 0;
          } else {
            up = 1;
            down = 0;
          }
        } else {
          if (v < this.cv) {
            if (down) {
              incr();
              down = 0;
            } else {
              down = 1;
              up = 0;
            }
          }
        }
        v = this.cv;
      }
    });
  }
};

knobDemo.init();
