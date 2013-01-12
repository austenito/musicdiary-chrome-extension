//run_background();
//init();
//setInterval("runBackground()", 1000);

//function init() {
//};

$(function() {
  $(".song_title").bind("DOMSubtreeModified", function() { 
    console.log($('.song_title').attr("href"));
  });
});
