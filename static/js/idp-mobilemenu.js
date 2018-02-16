var Project = (function ($, window, document, undefined) {
    

    return {
        init: function () {

            $('#eduid-idp-navbar div.navbar-header > span').off('click').on('click', function () {

                if ($('#header #eduid-idp-navbar div.navbar-header > span').hasClass('open')) {
                    $('#header #eduid-idp-navbar div.navbar-header > span').removeClass('open');
                    $(this).removeClass('open');
                } else {
                    $('#header #eduid-idp-navbar div.navbar-header > span').addClass('open');
                    $(this).addClass('open');
                }
            });
        }
    }

})(jQuery, window, document);

$(function () {
    Project.init();
});
