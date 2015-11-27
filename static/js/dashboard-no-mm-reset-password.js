/**
 * Created by lundberg on 2015-11-27.
 */

(function () {
  $(document).ready(function () {

    var disabled_mm_button = $("#buttonNoMM");
    if (disabled_mm_button.length > 0) {
        console.log("Mina Meddelanden disabled");
        var title = $('span.dataholder#disabled_mm').data('title');
        var content = $('span.dataholder#disabled_mm').data('content');

        disabled_mm_button.click( function (e) {
            e.preventDefault();
        });

        disabled_mm_button.popover({
            title: title,
            content: content,
            trigger: 'focus',
            placement: 'auto',
            html: true
        })

    }
  });
}());
