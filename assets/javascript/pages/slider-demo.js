'use strict';

// noUiSlider Demo
// =============================================================

var nouisliderDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.colorpickerSlider();
    this.inputElementSlider();
    this.nonLinearSlider();
    this.lockingSlider();
    this.coloredSlider();
    this.keypressSlider();
    this.skippingStepSlider();
    this.hugeNumberSlider();
    this.keyboardSlider();
    this.datesSlider();
    this.softLimitSlider();
  },
  colorpickerSlider: function colorpickerSlider() {
    var resultElement = document.querySelector('#ncp-result');
    var colorpicker = document.querySelector('#nouislider-colorpicker');
    var selectors = colorpicker.querySelectorAll('div');

    // The setColor function
    var setColor = function setColor() {
      // Get the slider values, stick them together.
      var color = 'rgb(' + selectors[0].noUiSlider.get() + ',' + selectors[1].noUiSlider.get() + ',' + selectors[2].noUiSlider.get() + ')';
      // Fill the color box.
      resultElement.style.background = color;
      resultElement.style.color = color;
    };

    // Initializing the slider
    for (var i = 0; i < selectors.length; i++) {
      noUiSlider.create(selectors[i], {
        start: 128,
        connect: [true, false],
        orientation: 'vertical',
        range: {
          'min': 0,
          'max': 255
        },
        format: wNumb({
          decimals: 0
        })
      });

      // Bind the color changing function
      // to the slide event.
      selectors[i].noUiSlider.on('slide', setColor);
      // sliders[i].setAttribute('disabled', true);
    }
  },
  inputElementSlider: function inputElementSlider() {
    // Appending <option> elements
    var select = document.getElementById('input-select');

    // Append the option elements
    for (var i = -20; i <= 40; i++) {
      var option = document.createElement('option');
      option.text = i;
      option.value = i;

      select.appendChild(option);
    }

    // Initializing the slider
    var selector = document.getElementById('html5');
    noUiSlider.create(selector, {
      start: [10, 30],
      connect: true,
      range: {
        'min': -20,
        'max': 40
      }
    });

    // Linking the <select> and <input>
    var inputNumber = document.getElementById('input-number');
    selector.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];
      if (handle) {
        inputNumber.value = value;
      } else {
        select.value = Math.round(value);
      }
    });

    select.addEventListener('change', function () {
      selector.noUiSlider.set([this.value, null]);
    });
    inputNumber.addEventListener('change', function () {
      selector.noUiSlider.set([null, this.value]);
    });
  },
  nonLinearSlider: function nonLinearSlider() {
    var selector = document.getElementById('nonlinear');

    noUiSlider.create(selector, {
      connect: true,
      behaviour: 'tap',
      start: [500, 4000],
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        'min': [0],
        '10%': [500, 500],
        '50%': [4000, 1000],
        'max': [10000]
      }
    });

    // Read the slider value and the left offset
    var nodes = [document.getElementById('lower-value'), // 0
    document.getElementById('upper-value') // 1
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    selector.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
      nodes[handle].innerHTML = values[handle] + ', ' + positions[handle].toFixed(2) + '%';
    });
  },
  lockingSlider: function lockingSlider() {
    var selector1 = document.getElementById('slider1');
    var selector2 = document.getElementById('slider2');
    var lockButton = document.getElementById('lockbutton');
    var slider1Value = document.getElementById('slider1-span');
    var slider2Value = document.getElementById('slider2-span');
    var lockedState = false;
    var lockedValues = [60, 80];

    // When the button is clicked, the locked
    // state is inverted.
    lockButton.addEventListener('click', function () {
      lockedState = !lockedState;
      this.textContent = lockedState ? 'Unlock' : 'Lock';
    });

    // The Crossupdate function
    var crossUpdate = function crossUpdate(value, slider) {
      // If the sliders aren't interlocked, don't
      // cross-update.
      if (!lockedState) return;
      // Select whether to increase or decrease
      // the other slider value.
      var a = selector1 === slider ? 0 : 1;
      var b = a ? 0 : 1;
      // Offset the slider value.
      value -= lockedValues[b] - lockedValues[a];
      // Set the value
      slider.noUiSlider.set(value);
    };

    // Initializing the sliders
    noUiSlider.create(selector1, {
      start: 60,
      connect: [true, false],
      // Disable animation on value-setting,
      // so the sliders respond immediately.
      animate: false,
      range: {
        min: 50,
        max: 100
      }
    });

    noUiSlider.create(selector2, {
      start: 80,
      connect: [true, false],
      animate: false,
      range: {
        min: 50,
        max: 100
      }
    });

    selector1.noUiSlider.on('update', function (values, handle) {
      slider1Value.innerHTML = values[handle];
    });
    selector2.noUiSlider.on('update', function (values, handle) {
      slider2Value.innerHTML = values[handle];
    });

    // Linking the sliders together
    var setLockedValues = function setLockedValues() {
      lockedValues = [Number(selector1.noUiSlider.get()), Number(selector2.noUiSlider.get())];
    };

    selector1.noUiSlider.on('change', setLockedValues);
    selector2.noUiSlider.on('change', setLockedValues);
    // The value will be send to the other slider,
    // using a custom function as the serialization
    // method. The function uses the global 'lockedState'
    // variable to decide whether the other slider is updated.
    selector1.noUiSlider.on('slide', function (values, handle) {
      crossUpdate(values[handle], selector2);
    });
    selector2.noUiSlider.on('slide', function (values, handle) {
      crossUpdate(values[handle], selector1);
    });
  },
  coloredSlider: function coloredSlider() {
    var selector = document.getElementById('slider-color');

    noUiSlider.create(selector, {
      start: [4000, 8000, 12000, 16000],
      connect: [false, true, true, true, true],
      range: {
        'min': [2000],
        'max': [20000]
      }
    });

    var connect = selector.querySelectorAll('.noUi-connect');
    var classes = ['bg-primary', 'bg-danger', 'bg-success', 'bg-warning'];
    for (var i = 0; i < connect.length; i++) {
      connect[i].classList.add(classes[i]);
    }
  },
  keypressSlider: function keypressSlider() {
    var selector = document.getElementById('keypress');
    var input0 = document.getElementById('input-with-keypress-0');
    var input1 = document.getElementById('input-with-keypress-1');
    var inputs = [input0, input1];

    // Initializing the slider and linking the input
    noUiSlider.create(selector, {
      start: [20, 80],
      connect: true,
      direction: 'rtl',
      tooltips: [true, wNumb({ decimals: 1 })],
      range: {
        'min': [0],
        '10%': [10, 10],
        '50%': [80, 50],
        '80%': 150,
        'max': 200
      }
    });

    selector.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle];
    });

    // Listen to keypress on the input
    var setSliderHandle = function setSliderHandle(i, value) {
      var r = [null, null];
      r[i] = value;
      selector.noUiSlider.set(r);
    };

    // Listen to keydown events on the input field.
    inputs.forEach(function (input, handle) {
      input.addEventListener('change', function () {
        setSliderHandle(handle, this.value);
      });

      input.addEventListener('keydown', function (e) {
        var values = selector.noUiSlider.get();
        var value = Number(values[handle]);
        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = selector.noUiSlider.steps();
        // [down, up]
        var step = steps[handle];
        var position = void 0;
        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {
          case 13:
            setSliderHandle(handle, this.value);
            break;
          case 38:
            // Get step to go increase slider value (up)
            position = step[1];
            // false = no step is set
            if (position === false) {
              position = 1;
            }
            // null = edge of slider
            if (position !== null) {
              setSliderHandle(handle, value + position);
            }
            break;
          case 40:
            position = step[0];
            if (position === false) {
              position = 1;
            }
            if (position !== null) {
              setSliderHandle(handle, value - position);
            }
            break;
        }
      });
    });
  },
  skippingStepSlider: function skippingStepSlider() {
    var selector = document.getElementById('skipstep');

    noUiSlider.create(selector, {
      range: {
        'min': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        // Nope, 40 is no fun.
        '50%': 50,
        '60%': 60,
        '70%': 70,
        // I never liked 80.
        '90%': 90,
        'max': 100
      },
      snap: true,
      start: [20, 90]
    });

    // Read the slider values
    var skipValues = [document.getElementById('skip-value-lower'), document.getElementById('skip-value-upper')];

    selector.noUiSlider.on('update', function (values, handle) {
      skipValues[handle].innerHTML = values[handle];
    });
  },
  hugeNumberSlider: function hugeNumberSlider() {
    var selector = document.getElementById('slider-huge');
    var bigValueSpan = document.getElementById('huge-value');

    noUiSlider.create(selector, {
      start: 4,
      step: 1,
      connect: [true, false],
      format: wNumb({
        decimals: 0
      }),
      range: {
        min: 0,
        max: 13
      }
    });

    // numbers.
    var range = [0, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 4294967296, 8589934592];
    var formater = wNumb({
      mark: '.',
      thousand: ',',
      prefix: '$ '
    });

    selector.noUiSlider.on('update', function (values, handle) {
      bigValueSpan.innerHTML = formater.to(range[values[handle]]);
    });
  },
  keyboardSlider: function keyboardSlider() {
    var selector = document.getElementById('keyboard');

    noUiSlider.create(selector, {
      start: 10,
      step: 10,
      range: {
        'min': 0,
        'max': 100
      }
    });

    // Listen to keypress on the handle
    var handle = selector.querySelector('.noUi-handle');
    handle.setAttribute('tabindex', 0);
    handle.addEventListener('click', function () {
      this.focus();
    });
    handle.addEventListener('keydown', function (e) {
      var value = Number(selector.noUiSlider.get());
      switch (e.which) {
        case 37:
          selector.noUiSlider.set(value - 10);
          break;
        case 39:
          selector.noUiSlider.set(value + 10);
          break;
      }
    });
  },
  datesSlider: function datesSlider() {
    // Create a new date from a string, return as a timestamp.
    var timestamp = function timestamp(str) {
      return new Date(str).getTime();
    };
    // Setup
    var selector = document.getElementById('slider-date');

    noUiSlider.create(selector, {
      // Create two timestamps to define a range.
      range: {
        min: timestamp('2010'),
        max: timestamp('2016')
      },
      // Steps of one week
      step: 7 * 24 * 60 * 60 * 1000,
      // Two more timestamps indicate the handle starting positions.
      start: [timestamp('2011'), timestamp('2015')],
      // No decimals
      format: wNumb({
        decimals: 0
      })
    });

    // Helper functions and formatting
    // Create a list of day and monthnames.
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Append a suffix to dates.
    // Example: 23 => 23rd, 1 => 1st.
    var nth = function nth(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
    // Create a string representation of the date.
    var formatDate = function formatDate(date) {
      return weekdays[date.getDay()] + ', ' + date.getDate() + nth(date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    };
    // Slider control
    var dateValues = [document.getElementById('event-start'), document.getElementById('event-end')];

    selector.noUiSlider.on('update', function (values, handle) {
      dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    });
  },
  softLimitSlider: function softLimitSlider() {
    var selector = document.getElementById('slider-soft');

    noUiSlider.create(selector, {
      start: 50,
      range: {
        min: 0,
        max: 100
      },
      pips: {
        mode: 'values',
        values: [20, 80],
        density: 4
      }
    });

    // Resetting using the change event
    selector.noUiSlider.on('change', function (values, handle) {
      if (values[handle] < 20) {
        selector.noUiSlider.set(20);
      } else if (values[handle] > 80) {
        selector.noUiSlider.set(80);
      }
    });
  }
};

nouisliderDemo.init();
