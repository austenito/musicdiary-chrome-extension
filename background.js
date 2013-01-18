var musicDiaryListener = (function() {
  var bg = {}
  var lastRequestId = 0;
  var lastSongUrlPlayed = "";
  var rdioUrl = "http://www.rdio.com/api/1/getPlaybackInfo";

  chrome.webRequest.onCompleted.addListener(function(details) {
    var nextRequestId = lastRequestId + 1
    if (details.url == rdioUrl && nextRequestId != lastRequestId) {
      chrome.tabs.query({url: "http://www.rdio.com/*"}, bg.getSongUrlFromTab);
    }
    lastRequestId = details.requestId;
  }, {urls: ["http://www.rdio.com/*"]}, []);

  bg.getSongUrlFromTab = function(tabs) {
    if(tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {request: "getSongUrl"}, bg.sendSongPlayed);
    }
  };

  bg.sendSongPlayed = function(response) {
    var songUrl = response.songUrl;
    if(songUrl && lastSongUrlPlayed != songUrl) {
      console.log(songUrl);

      body = {};
      body["service"] = "rdio";
      body["url"] = songUrl;

      var xhr = new XMLHttpRequest();
      //xhr.open("POST", "http://apihackday.herokuapp.com/log", true);
      xhr.open("POST", "http://localhost:3000/log", true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(body));
    }
    lastSongUrlPlayed = songUrl;
  }

  return bg;
}());
