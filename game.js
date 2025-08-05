var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var restartGame = false;
var started = false;

function generateNextStep(){
  var buttonNumber = Math.floor(Math.random() * 4);
  return buttonNumber
}

function checkUserSequence(){
  var index = userClickedPattern.length - 1;

  if(gamePattern.length < index)
    return false;
  
  return userClickedPattern[index] === gamePattern[index];
}

function changeH1(text){
  $("h1").text(text);
}

function showCorrect(nextColor){
  var audio = new Audio("./sounds/" + nextColor + ".mp3");
  audio.play();
}

function showWrong(){
  $("body").addClass("game-over");
  var audio = new Audio("./sounds/wrong.mp3");

  setTimeout(function(){
    $("body").removeClass("game-over");
    audio.play();
  }, 200);
}

function play(){
  changeH1("Level " + (gamePattern.length + 1));
  userClickedPattern = [];
  var nextStep = generateNextStep();
  var nextColor = buttonColours[nextStep];
  gamePattern.push(nextStep);
  $("#" + nextColor).fadeOut(150).fadeIn(150);
}

$("div.btn").click(function(){
  var userChosenColour = $(this).attr("id");
  var userChosenNumber = buttonColours.indexOf(userChosenColour);

  $(this).addClass("pressed");
  setTimeout(function(){ $("#" + userChosenColour).removeClass("pressed") }, 300);

  userClickedPattern.push(userChosenNumber);

  if(checkUserSequence() && !restartGame){
    showCorrect(userChosenColour);

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        play();
      }, 700);
    }
      
  }
  else{
    showWrong();
    restartGame = true;
    changeH1("Game Over, Press Any Key to Restart");
    started = false;
  }
});

$(document).on("keypress", function(){
  if(!started){
    started = true;
    restartGame = false;
    gamePattern = [];
    play();
  }
});