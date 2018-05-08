jQuery(document).ready(function () {
    "use strict";
    var dataholder = $('span.dataholder#new-password-data'),
        password_min_entropy = parseInt(dataholder.data('min_entropy')),
        zxcvbn_terms = dataholder.data('zxcvbn_terms')

    var options = {};
    options.ui = {
        container: "#pwd-container",
        showVerdicts: false,
        scores: [password_min_entropy * 0.25,
                 password_min_entropy * 0.5,
                 password_min_entropy * 0.75,
                 password_min_entropy],
        viewports: {
            progress: ".pwstrength_viewport_progress"
        }
    };
    options.common = {
        debug: false,
        zxcvbn: true,
        zxcvbnTerms: ["eduid"].concat(zxcvbn_terms),
    };
    $('#custom-password').pwstrength(options);
});
