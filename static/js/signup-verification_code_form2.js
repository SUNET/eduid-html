$(function ($) {
    "use strict";

    $(document).ready(function () {
        $('button#gotit_btn').click(function (e) {
          $('#instructions_div').removeClass('hide');
          $('#gotit_btn').addClass('hide');
        });
    });

}(jQuery));
