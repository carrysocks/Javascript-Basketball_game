const canvas = document.querySelector("#basketball");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

class Player{
  constructor(width,height,speed,physical){
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.physical = physical;
  }
	
}

const player1 = new Player(50,100,3,5);
const player2 = new Player(50,100,3,5);
let player1X = 0;
let player2X = width-player2.width;
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
const player1HandAngleDIF = Math.PI / 60;
const player2HandAngleDIF = Math.PI / 60;
const player1HandLength = player1.width * Math.sqrt(2);
const player2HandLength = player2.width * Math.sqrt(2);

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

const draw = () => {
	ctx.clearRect(0, 0, width, height);
	player1CenterX = player1X + 0.5*player1.width;
	player1CenterY = height - 0.5*player1.height;
	player2CenterX = player2X + 0.5*player2.width;
	player2CenterY = height - 0.5*player2.height;

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
	
	
  drawPlayer1();
  drawPlayer2();
  drawHoop();
  drawBall();
}
const drawPlayer1 = () => {
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(player1X, height - player1.height);
  ctx.lineTo(player1X + player1.width, height - player1.height);
  ctx.lineTo(player1X + player1.width, height);
  ctx.lineTo(player1X, height);
  ctx.lineTo(player1X, height - player1.height);
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
  ctx.moveTo(player2X, height - player2.height);
  ctx.lineTo(player2X + player2.width, height - player2.height);
  ctx.lineTo(player2X + player2.width, height);
  ctx.lineTo(player2X, height);
  ctx.lineTo(player2X, height - player2.height);
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
const drawBall = () => {}

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
	else if(event.code ==="ArrowLeft"){
		player2LeftPressed = true;
	}
	else if(event.code ==="ArrowRight"){
		player2RightPressed = true;
	}
	else if(event.code ==="ArrowUp"){
     player2HandAngle += player2HandAngleDIF;
  }
	else if(event.code ==="ArrowDown"){
     player2HandAngle -= player2HandAngleDIF;
  }
};
const keyupHandler = event => {
  if(event.key ==="a"){
    player1LeftPressed = false;
  }
  else if(event.key ==="d"){
    player1RightPressed = false;
  }
	else if(event.code ==="ArrowLeft"){
		player2LeftPressed = false;
	}
	else if(event.code ==="ArrowRight"){
		player2RightPressed = false;
	}
};
const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);