(function ($) {
      if (window.messagesTimer === undefined) {
          window.messagesTimer = null;
      }

      window.clearMessages = function() {
        if (window.messagesTimer) {
          window.clearTimeout(window.messagesTimer);
        }
        $('.alert').not('.fixed').fadeOut(400, function (){
          var messages_holder = $(this).parent();
          $(this).remove();
          if (messages_holder.children().length === 0) {
            messages_holder.parent().addClass('messages-wrapper-empty');
        }
      });
      };

      var setMessagesTimer = function () {
        window.messagesTimer = window.setTimeout(window.clearMessages, 10000);
      };

      window.messagesResetTimer = function (index) {
        window.clearTimeout(window.messagesTimer);
        // do a fancy effect
        setMessagesTimer();
        $($('.alert')[index]).animate({opacity: 0.25}, 150).delay(150).animate({opacity: 1}, 150);

      };

      $(document).ready(function () {
        $(document).ready(function () {$('div#content-block').show()});
        $('[data-toggle="tooltip"]').tooltip();
        $('a.null-link').click(function (e) {
            e.preventDefault();
        });
        $('p#go-to-new-dashboard a').click(function (e) {
            e.preventDefault();
            Cookies.remove('eduid-dashboard-version');
            Cookies.set('eduid-dashboard-version', '2');
            document.location.reload(true);
        });
        setMessagesTimer();
      });
}(jQuery));

