'use strict';

// Flatpickr Demo
// =============================================================

var flatpickrDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleFlatpickr();
  },
  _fp1: function _fp1() {
    // basic
    return flatpickr('#flatpickr01', {});
  },
  _fp2: function _fp2() {
    // DateTime
    return flatpickr('#flatpickr02', {
      disableMobile: true, // always use the non-native picker
      enableTime: true,
      dateFormat: 'Y-m-d H:i'
    });
  },
  _fp3: function _fp3() {
    // Human-friendly Dates
    return flatpickr('#flatpickr03', {
      disableMobile: true,
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d'
    });
  },
  _fp4: function _fp4() {
    // minDate and maxDate
    return flatpickr('#flatpickr04', {
      disableMobile: true,
      minDate: 'today',
      maxDate: new Date().fp_incr(14)
    });
  },
  _fp5: function _fp5() {
    // Disabling dates
    return flatpickr('#flatpickr05', {
      disableMobile: true,
      disable: ['2025-01-30', '2025-02-21', '2025-03-08', new Date(2025, 4, 9)],
      dateFormat: 'Y-m-d'
    });
  },
  _fp6: function _fp6() {
    // Selecting multiple dates
    return flatpickr('#flatpickr06', {
      disableMobile: true,
      mode: 'multiple',
      dateFormat: 'Y-m-d',
      defaultDate: ['2018-03-20', '2018-04-04']
    });
  },
  _fp7: function _fp7() {
    // Range Calendar
    return flatpickr('#flatpickr07', {
      disableMobile: true,
      mode: 'range',
      dateFormat: 'Y-m-d',
      defaultDate: ['2018-03-03', '2018-03-20']
    });
  },
  _fp8: function _fp8() {
    // Time Picker
    return flatpickr('#flatpickr08', {
      disableMobile: true,
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      defaultDate: '13:45'
    });
  },
  _fp9: function _fp9() {
    // wrap element
    return flatpickr('#flatpickr9', {
      disableMobile: true,
      wrap: true
    });
  },
  _fp10: function _fp10() {
    // Inline Calendar
    return flatpickr('#flatpickr10', {
      inline: true
    });
  },
  handleFlatpickr: function handleFlatpickr() {
    this._fp1();
    this._fp2();
    this._fp3();
    this._fp4();
    this._fp5();
    this._fp6();
    this._fp7();
    this._fp8();
    this._fp9();
    this._fp10();
  }
};

flatpickrDemo.init();
