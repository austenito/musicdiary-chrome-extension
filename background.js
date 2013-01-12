$(function() {
  $(".song_title").bind("DOMSubtreeModified", function(event) {
    if(event.srcElement.text != "") {
      song_url = $('.song_title').attr("href");
      body = {};
      body["service"] = "rdio";
      body["url"] = song_url;
      console.log(song_url);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://apihackday.herokuapp.com/log", true);
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.send(JSON.stringify(body));
    }
  });
});
