var bkg = chrome.extension.getBackgroundPage();
$(document).ready(function() {
  $("#authenticated").hide();
  $("#login").hide();
  $("#auth-error").hide();

  var serverUrl = chrome.app.getDetails().homepage_url;
  $.get(serverUrl + "/check_auth", function(data){
    if(data.authenticated) {
      $("#authenticated").show();
      getDiary();
      getPlaylist();
    }
    else {
      $("#login").show();
    }
  })
  .fail(function() {
    $("#auth-error").show();
  });

  var getDiary = function() {
    $.get(serverUrl + "/api/diary?song_count=5", function(data) {
      _.each(data.songs, function(element, index, list) {
        var row = "<tr>";
        row += "<td><img src=" + element.icon + "></td>";
        row += "<td><a target='_blank' href='http://www.rdio.com/" + element.url + "'>" + element.name + "</a></td>";
        row += "<td>" + element.from_now + "</td>";
        row += "</tr>";
        $("#diary-table tr:last").after(row);
      });
    });
  }

  var getPlaylist = function() {
    $.get(serverUrl + "/api/playlist?song_count=5", function(data) {
      _.each(data.playlist, function(element, index, list) {
        var row = "<tr>";
        row += "<td><img src=" + element.icon + "></td>";
        row += "<td><a target='_blank' href='http://www.rdio.com/" + element.url + "'>" + element.name + "</a></td>";
        row += "<td>" + element.plays + "</td>";
        row += "</tr>";
        $("#playlist-table tr:last").after(row);
      });
    });
  }

  $("#signup-link").attr("href", serverUrl);
  $("#title-link").attr("href", serverUrl);

  chrome.extension.sendMessage({name: "popup-click"});
});
