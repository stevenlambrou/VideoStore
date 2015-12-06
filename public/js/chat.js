var count = 1;

$(".leftSide").fadeIn(500);

$(".addChat button").click(function() {
  $(".chatContainer").append('<div class="chatBox col-md-3" style="display: none;"> <div class="conversation"> </div> <input type = "text" name ="input" placeholder = "Type your message here!"><br> </div>');
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);
});
