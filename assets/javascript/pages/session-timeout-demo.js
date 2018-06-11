'use strict';

// Session Timeout Demo
// =============================================================

var sessionTimeoutDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleSessionTimeout();
  },
  handleSessionTimeout: function handleSessionTimeout() {
    $.sessionTimeout({
      message: 'Your session will be locked in one minute.',
      countdownMessage: 'Redirecting in <span class="badge badge-warning">{timer}</span> seconds.',
      logoutUrl: 'user-signin-v1.html',
      redirUrl: 'user-lockscreen.html',
      warnAfter: 10000,
      redirAfter: 30000,
      keepAlive: false,
      countdownSmart: true
    });
  }
};

sessionTimeoutDemo.init();
