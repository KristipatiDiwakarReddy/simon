var toggle= false;
var level = 0;
var userClickedPattern = [];
var gamePattern= [];
var buttonColors = ["red", "blue", "green", "yellow"];

$("body").keydown( function(){
  if (!toggle) {
    $("h1").text("level "+level);
    nextSequence()
    toggle=true
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour)
  console.log(userClickedPattern.length-1);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
     var audio = new Audio("sounds/"+name+".mp3");
     audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success")
     if (userClickedPattern.length===gamePattern.length) {
       setTimeout(function(){
         nextSequence();
       },1000);
     }
   } else {
     console.log("wrong")
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("h1").text("Game Over, Press Any Key to Restart");
     startOver();
   }
}

function startOver(){
  level = 0;
  gamePattern= [];
  toggle= false;
}
