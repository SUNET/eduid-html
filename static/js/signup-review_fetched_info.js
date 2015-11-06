$(function ($) {
    "use strict";

    $(document).ready(function () {
        $('#do-review-button').click(function (e) {
            $(this).find('span').removeClass('hidden');
        });
    });

}(jQuery));

