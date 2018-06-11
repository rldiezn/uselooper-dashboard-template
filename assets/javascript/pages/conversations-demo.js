'use strict';

// Conversation Demo
// =============================================================

var conversationDemo = {
  init: function init() {

    this.bindUIActions();
  },
  bindUIActions: function bindUIActions() {

    // event handlers
    this.handleScroll();
    this.handleTypingIndicator();
  },
  handleScroll: function handleScroll() {
    // scroll to last conversation
    var msgBody = document.querySelector('.message-body');
    msgBody.scrollTop = msgBody.scrollHeight;
  },
  handleTypingIndicator: function handleTypingIndicator() {
    // remove typing indicator demo after 10s
    setTimeout(function () {
      $('.conversation-list > li').last().fadeOut('slow', function () {
        $(this).remove();
      });
    }, 10000);
  }
};

conversationDemo.init();
