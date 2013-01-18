var bkg = chrome.extension.getBackgroundPage();
$(document).ready(function() {
  $("#authenticated").hide();
  $("#login").hide();

  var serverUrl = $("#config").data("server");
  $.get(serverUrl + "/check_auth", function(data){
    if(data.authenticated) {
      bkg.console.log("hi");
      $("#authenticated").show();
    }
    else {
      $("#login").show();
    }
  });
});
