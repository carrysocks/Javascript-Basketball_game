import {Player} from "./player.js";
import {Ball} from "./ball.js";
const startBtn = document.querySelector("#startBtn");
const select = document.querySelector(".selectForm");
const canvas = document.querySelector("#basketball");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let player1;
let player2;

const init = (player1_select,player2_select) => {
	if(player1_select === "kevin"){
		player1 = new Player(40,120,4,10,200,3,20);
	}
	else if(player1_select === "lebron"){
		player1 = new Player(70,110,3,20,250,5,3);
	}
	else if(player1_select === "curry"){
		player1 = new Player(50,80,3,8,200,3,60);
	}
	
	if(player2_select === "kevin"){
		player2 = new Player(40,120,4,10,200,3,20);
	}
	else if(player2_select === "lebron"){
		player2 = new Player(70,110,3,20,250,5,3);
	}
	else if(player2_select === "curry"){
		player2 = new Player(50,80,3,8,200,3,60);
	}
}

 async function load() {
    let {player1_select, player2_select, gameStart} = await import('./start.js');
  	console.log(player1_select, player2_select, gameStart);
	 
		if(gameStart){
			init(player1_select,player2_select);
			startBtn.className = "hide";
			select.className = "hide";
			canvas.className = "on";
			game();
		}
  }

startBtn.addEventListener("click", load);

const game = () => {
	
//player
let playerTurn = 1;
let player1X = 0;
let player2X = width-player2.width;
let player1Y = 0;
let player2Y = 0;
let player1JumpSpeed;
let player2JumpSpeed;
let playerCollied = false;
let colliedTime = 0;
let player1LeftPressed = false;
let player1RightPressed = false;
let player2LeftPressed = false;
let player2RightPressed = false;
let player1CenterX;
let player1CenterY;
let player2CenterX;
let player2CenterY;
let player1HandAngle = Math.PI / 4;
let player2HandAngle = Math.PI / 4;
let player1HandAngleDIF =	player1.player1HandAngleDIF;
let player2HandAngleDIF =	player2.player1HandAngleDIF;
const player1HandLength = (player1.height-50) * Math.sqrt(2);
const player2HandLength = (player2.height-50) * Math.sqrt(2);

//Map
const backBoardWidth = 20;
const backBoardHeight = 250;
const RimWidth = 80;
const RimHeight = 20;
const player1RimX = backBoardWidth;
const player1RimY = height - 200;
const player2RimX = width-backBoardWidth-RimWidth;
const player2RimY = height - 200;
const player1BackBoardX = 0;
const player1BackBoardY = height-backBoardHeight;
const player2BackBoardX = width-backBoardWidth;
const player2BackBoardY = height-backBoardHeight;

const gaugeBarRadius = 30;

const ball = new Ball(5);

const draw = () => {
	ctx.clearRect(0, 0, width, height);
	player1CenterX = player1X + 0.5*player1.width;
	player1CenterY = height - 0.5*player1.height - player1Y;
	player2CenterX = player2X + 0.5*player2.width;
	player2CenterY = height - 0.5*player2.height - player2Y;

	if(player1LeftPressed && player1X>0){
		player1X -= player1.speed;
	}
	if(player1RightPressed && player1X+player1.width<width){
		player1X += player1.speed;
	}
	if(player2LeftPressed && player2X>0){
		player2X -= player2.speed;
	}
	if(player2RightPressed && player2X+player2.width<width){
		player2X += player2.speed;
	}
	
	if(playerTurn === 1){
		if(player1.isCharging && !player1.isFired){
		if(player1.gauge < Math.PI * 2){
			player1.gauge += player1.gaugeDIF;
		}
			drawPlayer1Gausing();
		}
		
		if(!player1.isFired){
		ball.ballX = player1CenterX + player1HandLength*Math.cos(player1HandAngle);
		ball.ballY = player1CenterY - player1HandLength*Math.sin(player1HandAngle);
		}
		else if(player1.isFired){
			ball.ballSpeedY -= ball.GRAVITY_ACCELERATION;
			ball.ballX += ball.ballSpeedX;
			ball.ballY -= ball.ballSpeedY;
		}
		
	}
	else if(playerTurn ===2){
		if(player2.isCharging && !player2.isFired){
		if(player2.gauge < Math.PI * 2){
			player2.gauge += player2.gaugeDIF;
		}
			drawPlayer2Gausing();
		}
	
		if(!player2.isFired){
			ball.ballX = player2CenterX - player2HandLength*Math.cos(player2HandAngle);
			ball.ballY = player2CenterY - player2HandLength*Math.sin(player2HandAngle);
		}	
		else if(player2.isFired){
			ball.ballSpeedY -= ball.GRAVITY_ACCELERATION;
			ball.ballX -= ball.ballSpeedX;
			ball.ballY -= ball.ballSpeedY;
		}
	}
	
	if(player1.isJump){
				if(player1Y <= player1.jump){
						player1JumpSpeed - ball.GRAVITY_ACCELERATION;
						player1Y += player1JumpSpeed;
				}
				else{
					 player1.isFall = true;
					 player1.isJump = false;
				}
		}
		else if(player1.isFall){
			  if(player1Y >= 0){
					player1Y -= player1JumpSpeed;
				}
				else{
					player1.isFall =false;
				}
		}
	
	if(player2.isJump){
				if(player2Y <= player2.jump){
						player2JumpSpeed - ball.GRAVITY_ACCELERATION;
						player2Y += player2JumpSpeed;
				}
				else{
					 player2.isFall = true;
					 player2.isJump = false;
				}
		}
		else if(player2.isFall){
			  if(player2Y >= 0){
					player2Y -= player2JumpSpeed;
				}
				else{
					player2.isFall =false;
				}
		}
	
	if(playerCollied){
		if(colliedTime === 6){
			playerCollied = false;
			colliedTime = 0;
		}
		else{
			colliedTime += 1;
			if(player1X <= player2X){
				player1X -= player2.physical;
				player2X += player1.physical;
			}
			else{
				player1X += player2.physical;
				player2X -= player1.physical;
			}
		}
	}
	
	checkCollied();
	checkGoal();
  drawPlayer1();
  drawPlayer2();
  drawHoop();
  drawBall();
	drawThreePointLine();
}

const restartGame = () => {
	 player1X = 0;
   player2X = width-player2.width;
	 player1HandAngle = Math.PI / 4;
	 player2HandAngle = Math.PI / 4;
}

const checkCollied = () => {
	if( player2X <= player1X+player1.width && player1X+player1.width <= player2X+player2.width && player1Y+player1.height >= player2Y && player1Y <= player2Y+player2.height){
		playerCollied = true;
	}
	if( player1X <= player2X+player2.width && player2X+player2.width <= player1X+player1.width && player1Y+player1.height >= player2Y && player1Y <= player2Y+player2.height){
		console.log("hi");
		playerCollied = true;
	}
}

const checkGoal = () => {
	if (ball.ballX <= 0 || ball.ballX >= width || ball.ballY >= height) {
		
		if(!player1.isFired && !player2.isFired){
			console.log("out of bound");
			playerTurn = 3 - playerTurn;
		}
		else{
			player1.isFired = false;
		  player2.isFired = false;
		  playerTurn = 3 - playerTurn;
		}
  }
	if(player1RimX<=ball.ballX && ball.ballX<=player1RimX+RimWidth && player1RimY<=ball.ballY && ball.ballY<=player1RimY+RimHeight){
		if(player2X >= width/2){
			console.log("three point");
			player2.score += 3;
		}
		else{
			player2.score += 2;
		}
		console.log("2 win");
		playerTurn = 1;
		restartGame();
	}
	if(player2RimX<=ball.ballX && ball.ballX<=player2RimX+RimWidth && player1RimY<=ball.ballY && ball.ballY<=player1RimY+RimHeight){
		if(player1X <= width/2){
			console.log("three point");
			player1.score += 3;
		}
		else{
			player1.score += 2;
		}
		console.log("1 win");
		playerTurn = 2;
		restartGame();
	}
}
	
const drawPlayer1Gausing = () => {
  ctx.beginPath();
  ctx.arc(
    player1CenterX,
    player1CenterY - player1HandLength,
    gaugeBarRadius,
    Math.PI,
    player1.gauge,
    false
  );
  ctx.stroke();
};

const drawPlayer2Gausing = () => {
  ctx.beginPath();
  ctx.arc(
    player2CenterX,
    player2CenterY - player2HandLength,
    gaugeBarRadius,
    Math.PI,
    player2.gauge,
    false
  );
  ctx.stroke();
};

const drawPlayer1 = () => {
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(player1X, height - player1.height - player1Y);
  ctx.lineTo(player1X + player1.width, height - player1.height - player1Y);
  ctx.lineTo(player1X + player1.width, height - player1Y);
  ctx.lineTo(player1X, height - player1Y);
  ctx.lineTo(player1X, height - player1.height - player1Y);
	ctx.moveTo(player1CenterX, player1CenterY);
  ctx.lineTo(
    player1CenterX + player1HandLength * Math.cos(player1HandAngle),
    player1CenterY - player1HandLength * Math.sin(player1HandAngle)
  );
  ctx.stroke();
  ctx.closePath();
};

const drawPlayer2 = () => {
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(player2X, height - player2.height - player2Y);
  ctx.lineTo(player2X + player2.width, height - player2.height - player2Y);
  ctx.lineTo(player2X + player2.width, height - player2Y);
  ctx.lineTo(player2X, height - player2Y);
  ctx.lineTo(player2X, height - player2.height - player2Y);
	ctx.moveTo(player2CenterX, player2CenterY);
  ctx.lineTo(
    player2CenterX - player2HandLength * Math.cos(player2HandAngle),
    player2CenterY - player2HandLength * Math.sin(player2HandAngle)
  );
  ctx.stroke();
  ctx.closePath();
};
const drawHoop = () => {
	ctx.fillRect(player1BackBoardX, player1BackBoardY, backBoardWidth, backBoardHeight);
	ctx.fillRect(player2BackBoardX, player2BackBoardY, backBoardWidth, backBoardHeight);
	ctx.fillStyle = "salmon";
	ctx.fillRect(player1RimX, player1RimY, RimWidth, RimHeight);
	ctx.fillRect(player2RimX, player2RimY, RimWidth, RimHeight);
	ctx.fillStyle = "blue";
}
const drawBall = () => {
	ctx.beginPath();
	ctx.fillStyle = "red";
  ctx.arc(ball.ballX, ball.ballY, ball.ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

const drawThreePointLine = () => {
	ctx.fillStyle = "blue";
	ctx.fillRect(width/2,height-10,10,10);
}

const keydownHandler = event => {
  if(event.key==="a"){
    player1LeftPressed = true;
  }
  else if(event.key ==="d"){
    player1RightPressed = true;
  }
	else if(event.key ==="w"){
    player1HandAngle += player1HandAngleDIF;
  }
	else if(event.key ==="s"){
    player1HandAngle -= player1HandAngleDIF;
	}
	else if(event.key ==="r" && !player1.isFired){
		player1.isCharging = true;
	}
	else if(event.key ==="y" && !player1.isFall){
		player1JumpSpeed = player1.jumpSpeed;
		player1.isJump = true;
	}
	
	else if(event.key ==="ArrowLeft"){
		player2LeftPressed = true;
	}
	else if(event.key ==="ArrowRight"){
		player2RightPressed = true;
	}
	else if(event.key ==="ArrowUp"){
     player2HandAngle += player2HandAngleDIF;
  }
	else if(event.key ==="ArrowDown"){
     player2HandAngle -= player2HandAngleDIF;
  }
	else if(event.key ==="7" && !player2.isFired){
		player2.isCharging = true;
	}
	else if(event.key ==="9" && !player2.isFall){
		player2JumpSpeed = player2.jumpSpeed;
		player2.isJump = true;
	}
	
};
const keyupHandler = event => {
  if(event.key ==="a"){
    player1LeftPressed = false;
  }
  else if(event.key ==="d"){
    player1RightPressed = false;
  }
	else if(event.key ==="ArrowLeft"){
		player2LeftPressed = false;
	}
	else if(event.key ==="ArrowRight"){
		player2RightPressed = false;
	}
	else if(event.key ==="r" && !player1.isFired){
		player1.isCharging = false;
		player1.isFired = true;
		ball.ballPower = player1.gauge * 1.6;
		ball.ballSpeedX = ball.ballPower*Math.cos(player1HandAngle);
		ball.ballSpeedY = ball.ballPower*Math.sin(player1HandAngle);
		player1.gauge = Math.PI;
	}
	else if(event.key ==="y"){
		player1.isJump = false;
		player1.isFall = true;
	}
	else if(event.key ==="7" && !player2.isFired){
		player2.isCharging = false;
		player2.isFired = true;
		ball.ballPower = player2.gauge * 1.6;
		ball.ballSpeedX = ball.ballPower*Math.cos(player2HandAngle);
		ball.ballSpeedY = ball.ballPower*Math.sin(player2HandAngle);
		player2.gauge = Math.PI;
	}
	else if(event.key ==="9"){
		player2.isJump = false;
		player2.isFall = true;
	}
	
};
const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);

}