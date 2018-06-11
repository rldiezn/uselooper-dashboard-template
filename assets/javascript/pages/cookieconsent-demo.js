'use strict';

// Cookieconsent Demo
// =============================================================

var cookieconsentDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleCookieconsent();
  },
  handleCookieconsent: function handleCookieconsent() {
    window.cookieconsent.initialise({
      container: document.querySelector('#cookieDemo'),
      palette: {
        popup: { background: '#131D28' },
        button: { background: '#F7C46C' }
      },
      revokable: false,
      onStatusChange: function onStatusChange(status) {
        console.log(this.hasConsented() ? 'enable cookies' : 'disable cookies');
      },
      law: {
        regionalLaw: false
      },
      location: false, // disable automatically adapt to the user's location for demo purpose
      content: {
        'message': 'This website uses cookies to ensure you get the best experience on our website.',
        'dismiss': 'Got it'
      }
    });
  }
};

cookieconsentDemo.init();
