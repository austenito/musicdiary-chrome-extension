chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      var name = request.name;
     if(name == "getSongUrl") {
        songUrl = $('.song_title').attr("href");
        sendResponse({songUrl: songUrl});
      }
      else if(name == "getAuthed") {
        $.get(request.server + "/check_auth", function(data){
          sendResponse(data);
        });
        return true; // Return true to send response async
      }
    }
);
