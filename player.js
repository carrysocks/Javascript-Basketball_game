export class Player{
  constructor(width,height,speed,physical,jump,jumpSpeed,shoot){
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.physical = physical;
		this.jump = jump;
		this.jumpSpeed = jumpSpeed;
		this.score = 0;
		this.isCharging = false;
		this.isFired = false;
		this.isJump = false;
		this.isFall = false;
		this.gauge = Math.PI;
		this.gaugeDIF = Math.PI / 60;
		this.player1HandAngleDIF = Math.PI / shoot;
		this.player2HandAngleDIF = Math.PI / shoot;
  }
	
}