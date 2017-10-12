let dataholder = $('span.dataholder#u2f-data');
let u2fdata = JSON.parse(dataholder.data('u2fdata'));
let promptModal = $('#promptModal');
promptModal.modal({'show': false});

console.log("u2fdata");
console.log(u2fdata);

if (u2fdata) {
  promptModal.modal('show');
  let request = u2fdata.payload;

  u2f.register(request.appId, request.registerRequests, request.registeredKeys, function(resp) {
    promptModal.modal('hide');
    console.log("resp");
    console.log(resp);
    if(resp.errorCode) {
      let errorDiv = $('#u2f-error');
      let errorMessage = $('#u2f-error-message');
      errorDiv.show();
      switch (resp.errorCode) {
        case 1:
          errorMessage.html("U2F error: Unknown error");
          break;
        case 2:
          errorMessage.html("U2F error: Bad request");
          break;
        case 3:
          errorMessage.html("U2F error: Configuration unsupported");
          break;
        case 4:
          errorMessage.html("U2F error: Device ineligible");
          break;
        default:
          errorMessage.html("U2F failed with error code: " + resp.errorCode);
      }
    } else {

      let form = document.getElementById('u2f-register-form');
      form.csrf_token.value = request.csrf_token;
      form.token_response.value = JSON.stringify(resp);
      form.submit();
    }
  }, 10);
} else {
  $('#no-data').show();
}
