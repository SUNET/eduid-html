$(function ($) {
    "use strict";

    var prepare_modal = function (e, callback) {
            e.preventDefault();

            $('.aup a[href=#reject]').off().click(function (e) {
                e.preventDefault();
                $('.aup').modal('hide');
            });

            $('.aup a[href=#accept]').click(callback);

            $('.aup').modal('show');
        };

    $(document).ready(function () {
        $('a.btn-social').click(function (e) {
            var login_action = e.target;

            prepare_modal(e, function (e) {
                var loc;
                e.preventDefault();

                if ('href' in login_action) {
                    loc = login_action.href;
                } else {
                    loc = $(login_action).parents('a').attr('href');
                }

                document.location = loc;
            });
        });
        $('#email-register button[type=submit]').click(function (e) {
            var login_action = e.target;

            prepare_modal(e, function (e) {
                e.preventDefault();
                $(login_action).parents('form').submit();
            });
        });
    });

}(jQuery));

