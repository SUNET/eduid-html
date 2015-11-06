$(function ($) {
    "use strict";

    $(document).ready(function () {
        $('#verify-button').click(function (e) {
            if ($('#verification-code-input').val() !== '') {
                $(this).find('span').removeClass('hidden');
            }
        });
    });

}(jQuery));
