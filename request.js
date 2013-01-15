chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      songUrl = $('.song_title').attr("href");
      sendResponse({songUrl: songUrl});
    }
);
