//alert("welcome");
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];
var level=0;

var started = true;
$(document).keydown(function() {
    if (started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = false;
    }
  });

  function startOver(){
      level=0;
      gamePattern=[];
      started=true;
  }

  //1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
  function checkAnswer(currentLevel) {
  
      //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
        //console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  
  }
  

function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animation
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //Audio play
    playSound(randomChosenColor);

    
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}



