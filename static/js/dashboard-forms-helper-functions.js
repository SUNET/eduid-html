
(function () {

    function addDisableMmPopover() {
        var disabled_mm_button = $("#ninsview-formNoMM");
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
    }

    window.forms_helper_functions = {

        passwords: function () {
            $('#changePassword').click(function (e) {
                $('#changePasswordDialog').modal('show');
            });
            $('#init-termination-btn').click(function (e) {
                $('#terminate-account-dialog').modal('show');
            });
        },

        postaladdress: function () {
            window.deform && deform.addCallback(
               'postaladdressview-form',
               function() {
                  $('button.alternative-postal-address-button').click(function (){
                      $(this).toggleClass('hide');
                      $('.alternative-postal-address-form').toggleClass('hide');
                  });
           
                  $("#postaladderessview-form div.controls input").first().focus();
               }
           );
        },

        auto_displayname: function () {
            var givenName = $('input[name="givenName"]'),
                sn = $('input[name="sn"]');
            var update_displayname = function () {
                var displayName = $('input[name="displayName"]');
                if ( (!displayName.val()) &&
                     (givenName.val()) &&
                     (sn.val()) ) {
                       displayName.val(givenName.val() + ' ' + sn.val());
                }
            };
            givenName.blur(update_displayname);
            sn.blur(update_displayname);
        },

        horizontal_sequence: function () {
            var dataholder = $('span.dataholder#field-oid'),
                field_oid = dataholder.data('fieldoid'),
                min_len = parseInt(dataholder.data('min_len')),
                max_len = parseInt(dataholder.data('max_len')),
                now_len = parseInt(dataholder.data('now_len')),
                orderable = parseInt(dataholder.data('orderable'));
             deform.addCallback(
               field_oid,
               function(oid) {
                 oid_node = $('#'+ oid);
                 deform.processSequenceButtons(oid_node, min_len,
                                               max_len, now_len,
                                               orderable);
               }
             );
            if (orderable) {
                $( "#${oid}-orderable" ).sortable({handle: "span.deformOrderbutton"});
            }
        },

        form_always: function () {
            var field_formid = $('span.dataholder#field-formid').data('fieldformid');
            // Highlight all tabs with errors, move to the first one with the error
            window.deform && deform.addCallback(
               field_formid,
               function() {
                var alreadySelected = false;
        
                // If we get some errors, remove the active classes
                if($("div.tab-content fieldset div.has-error").length !== 0){
                  $("ul.form-tabs li.active").removeClass('active');
                  $("div.tab-content fieldset.active").removeClass('active in');
                }
                // Go through the errors, set first one to active and focus the field,
                // and add an 'error' class to all of the tabs with errors in them
                $("div.tab-content fieldset div.has-error").each( function() {
                  var errorId = $(this.parentNode).attr('id');
                  if(!alreadySelected){
                    $("ul.form-tabs li#" + errorId + '-list').addClass('active');
                    $("div.tab-content fieldset#" + errorId).addClass('active in');
                    $("#" + $(this).attr('id') + " div.controls input").focus();
                    alreadySelected = true;
                  }
                  $("ul.form-tabs li#" +errorId + '-list').addClass('text-danger');
                });
            });
            window.deform && deform.addCallback(
                field_formid,
                function () {
                    $('body').trigger('formready');
                }
            );
        },

        form_use_ajax: function () {
            var dataholder = $('span.dataholder#field-formid'),
                field_formid = dataholder.data('fieldformid'),
                ajax_options = dataholder.data('ajax_options');
            window.deform && deform.addCallback(
               field_formid,
               function(oid) {
                 if (window.beforeSubmit === undefined) {
                    window.beforeSubmit = function () {};
                 }
                 var targetElem = $('#' + oid);
                 var options = {
                        target: '#' + oid,
                        replaceTarget: true,
                        success: function(response_text, status_text, xhr) {
                          var loc = xhr.getResponseHeader('X-Relocate');
                          if (loc) {
                              document.location = loc;
                          };
                          targetElem.initDeformCallbacks();
                          deform.processCallbacks();
                          deform.focusFirstInput();
                          $('body').trigger('form-submitted');
                        },
                        error: function() {
                          $('body').trigger('communication-error');
                        },
                        beforeSubmit: window.beforeSubmit
                     },
                     extra_options = ajax_options || {};
                 console.log('Set AJAX form at ' + oid);
                 targetElem.ajaxForm($.extend(options, extra_options));
               }
            );
        },
        
        permissions: function () {
            var dataholder = $('span.dataholder#permissionsform-data'),
                formname = dataholder.data('formname'),
                msg_confirm = dataholder.data('msg_confirm');
        
            if ($('#' + formname + '-form').length > 0) {
                window.beforeSubmit = function (arr, $form, options) {
                    var q=confirm(msg_confirm);
                    if (!q) {
                      return false
                    }
                }
            }
        },

        nins: function () {
            var msg_verifying = $('span.dataholder#ninsform-data').data('msg_verifying');
            window.beforeSubmit = function () {
                $('#ninsview-formadd').
                    prop('disabled', true);
                $('#ninsview-formadd_by_mobile').
                    prop('disabled', true).
                    after('<p class="nin-wait">' + msg_verifying + '</p>');
            };
            // Popover for disabled MM button
            addDisableMmPopover();
        },

        initialize_pending_actions: function () {
            $('ul.pending-actions a').click(function (e) {
                var action_path = e.target.href.split('#')[1];
                window.forms_helper_functions.initialize_verification(action_path);
            });
        },

        initialize_verification: function(action_path) {
            if (action_path !== undefined && action_path !== "") {
                var container = $('.tabbable');
                if (action_path.indexOf('/') === -1) {
                    container.find('.nav-tabs a.main-nav-tabs[href=#' + action_path + ']').click();
                } else {
                    var segments = action_path.split('/');
                    $(document).one('formready', function () {
                        var form_container = $('.' + segments[0] + 'view-form-container');
                        var link_selector = 'input.btn-link[name="' + segments[1] + '"]';
                        var verification_links = form_container.find(link_selector);
                        if (verification_links.length === 1) {
                            var verification_link = verification_links[0];
                        } else {
                            var link_index = + segments[2];
                            var verification_link = verification_links[link_index];
                        }
                        verification_link.click();
                    });
                    container.find('.nav-tabs a.main-nav-tabs[href=#' + segments[0] + ']').click();
                }
            }
        }
    };
}());
