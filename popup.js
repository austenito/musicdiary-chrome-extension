var bkg = chrome.extension.getBackgroundPage();
$(document).ready(function() {
  $("#authenticated").hide();
  $("#login").hide();
  $("#auth-error").hide();

  var serverUrl = chrome.app.getDetails().homepage_url;
  $.get(serverUrl + "/check_auth", function(data){
    if(data.authenticated) {
      $("#authenticated").show();
    }
    else {
      $("#login").show();
    }
  })
  .fail(function() {
    $("#auth-error").show();
  });

  $("#signup-link").attr("href", serverUrl);
  $("#title-link").attr("href", serverUrl);
});
