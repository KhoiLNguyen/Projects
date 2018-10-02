$('h1').on('click', function() {

  $(this).css("backgroundColor", "white")
});

$('input').on('keypress',function(event) {
  console.log("Keypressed");
});