var lastRequestId = 0;
chrome.webRequest.onCompleted.addListener(function(details) {
  var nextRequestId = lastRequestId + 1
  if(details.url == "http://www.rdio.com/api/1/getPlaybackInfo" && details.requestId != nextRequestId) {
    chrome.tabs.query({url: "http://www.rdio.com/*"}, function(tabs) {
      if(tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {request: "getSongUrl"}, function(response) {
          this.sendSongPlayed(response.songUrl);
        });
      }
    });
  }
  lastRequestId = details.requestId;
}, {urls: ["http://www.rdio.com/*"]}, []);

function sendSongPlayed(songUrl) {
  if(songUrl) {
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
}
