$(function ($) {
    "use strict";

    $(document).ready(function () {
        $('button#gotit_btn').click(function (e) {
          e.preventDefault();
          $('#instructions_div').show();
          $('#password-gotit-div').hide();
        });
    });

}(jQuery));
