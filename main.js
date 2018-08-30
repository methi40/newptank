
var canvas = document.querySelector("#canvas");
var cx = canvas.getContext("2d");
// control variables
var isFire_1 = false;
var isFire_2 = false;
var score_1 = 0;
var score_2 = 0;
var remChances_1 = 4;
var remChances_2 = 4;
var angle_1 = Math.PI / 2;
var angle_2 = Math.PI / 2;
var weapon_1 = "Weapon1";
var weapon_2 = "Weapon1";

// texts for display
function displayText() {
  // center text
  cx.font = "Arial";
  cx.fillStyle = "red";
  cx.textAlign = "center";
  cx.fillText("POCKET TANKS", canvas.width / 2, 50);

  
  // Player_2 info

  cx.font = "18px Verdana";
  cx.fillStyle = "#E0E0E0";
  cx.textAlign = "right";
  cx.fillText("Player 2", canvas.width - 20, 30);

  
}

// Weapon Selector
function changeWeapon() {
  if (document.getElementById("weapon-selector").value == "Weapon1") {
    weapon_1 = "Weapon1";
    weapon_2 = "Weapon1";
  }
  if (document.getElementById("weapon-selector").value == "Weapon2") {
    weapon_1 = "Weapon2";
    weapon_2 = "Weapon2";
  }
  if (document.getElementById("weapon-selector").value == "Weapon3") {
    weapon_1 = "Weapon3";
    weapon_2 = "Weapon3";
  }
}
// click fire action
const fire = document.querySelector("#fire-weapon");
fire.addEventListener("click", function (e) {
  if (remChances_1 == 4) {
    isFire_1 = true;
    if (remChances_1 >= 1) {
      remChances_1--;
    }
    isFire_2 = false;
  } else if (isFire_1 && !isFire_2) {
    isFire_2 = true;
    if (remChances_2 >= 1) {
      remChances_2--;
    }
    isFire_1 = false;
  } else if (!isFire_1 && isFire_2) {
    isFire_1 = true;
    if (remChances_1 >= 1) {
      remChances_1--;
    }
    isFire_2 = false;
  }
});
//Slider for Angle
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value + "deg";

slider.oninput = function () {
  output.innerHTML = `${this.value}deg`;
  angle_1 = Math.PI * this.value / 180;
  angle_2 = Math.PI * this.value / 180;
};

 

//variables for projectile-one
var x_1;
var y_1;
var u_1 ;
changePower();
var time_1 = 0.01;
var timeOfFlight_1 = 2 * u_1 * Math.sin(angle_1) / 10;


// reset projectile two
function resetProjectileTwo() {
  x_1 = 0;
  y_1 = 0;
  changePower();
  time_1 = 0.01;
  timeOfFlight_1 = 2 * u_1 * Math.sin(angle_1) / 10;
}

// For  Projectile Two
var x_2;
var y_2;
var u_2 ;
changePower();
var time_2 = 0.1;
var timeOfFlight_2 = 2 * u_2 * Math.sin(angle_2) / 10;


// resetProjectileOne
function resetProjectileOne() {
  x_2 = 0;
  y_2 = 0;
  changePower();
  time_2 = 0.1;
  timeOfFlight_2 = 2 * u_2 * Math.sin(angle_2) / 10;
}
//for speed
 function changePower() {
  if (document.getElementById("power-selector").value == "weak") {
    u_1 = 50;
    u_2 = 50;
  }
  if (document.getElementById("power-selector").value == "normal") {
    u_1 = 70;
    u_2 = 70;
  }
  if (document.getElementById("power-selector").value == "strong") {
    u_1 = 95;
    u_2 = 95;
  }
}


var currentHeight = canvas.height - 100;
 

//Calculate projectile position for tank one
function calcPositionOne() {
  x_1 = u_1 * Math.cos(angle_1) * time_1;
  y_1 = -(u_1 * Math.sin(angle_1) * time_1 - 0.5 * 10 * time_1 * time_1);
}

// Draw Projectile-one
function drawProjectileOne() {
  calcPositionOne();
  for (let i = 0; i < 1000; ++i) {
    if (120 + x_1 >= 187 && 120 + x_1 < 560) {
      let index = 120 + x_1 - 187;
    }
  }
  if (true) {
    time_1 += 0.1;

      cx.beginPath();
      cx.arc(120 + x_1, 500 + y_1, 8, 0,8);
      cx.fillStyle = "yellow";
      cx.fill();
      cx.closePath();
  }
  if (120 + x_1 > 611 && 120 + x_1 < 661 && 320 + y_1 > 307) {
    
      score_1 += 500;
    }
  
}
// For tank-two
function calcPositionTwo() {
  x_2 = -u_2 * Math.cos(angle_2) * time_2;
  y_2 = -(u_2 * Math.sin(angle_2) * time_2 - 0.5 * 10 * time_2 * time_2);
}

// Draw Projectile-two
function drawProjectileTwo() {
  calcPositionTwo();
  for (let i = 0; i < 1000; ++i) {
    if (621 + x_2 >= 187 && 621 + x_2 < 560) {
      let index = 621 + x_2 - 187;
      
    }
  }
  if (true) {
    time_2 += 0.1;
    
      cx.beginPath();
      cx.arc(740 + x_2, 500 + y_2, 8, 0, 7);
      cx.fillStyle = "yellow";
      cx.fill();
      cx.closePath();
    
  }
  if (621 + x_2 > 72 && 621 + x_2 < 142 && 320 + y_2 > 307) {
    
      score_2 += 500;
    
  }
}

// Drawing actual game
function drawGame() {
  if (true) {
    cx.clearRect(0, 0, canvas.width, canvas.height);
    displayText();

    //Projectile one
    if (isFire_1 && remChances_1 >= 1) {
      if (time_1 < timeOfFlight_1) {
        drawProjectileOne();
      }
      if (time_1 > timeOfFlight_1 ) {
        resetProjectileOne();
      }
    }
    //Projectile 2
    if (isFire_2 && remChances_2 >= 1) {
      if (time_2 < timeOfFlight_2) {
        drawProjectileTwo();
      }
      if (time_2 > timeOfFlight_2 ) {
        resetProjectileTwo();
      }
    }
     
  }
  window.requestAnimationFrame(drawGame);
}
drawGame();