const startBtn = document.querySelector("#startBtn");
const player1_selected = document.querySelectorAll("input[name='player1Name']");
const player2_selected = document.querySelectorAll("input[name='player2Name']");
let player1_select;
let player2_select;
let gameStart = false;

startBtn.addEventListener('click',function(){
	for(let i=0;i< player1_selected.length;i++){
		if(player1_selected[i].checked){
				player1_select = player1_selected[i].value;			
		}
		if(player2_selected[i].checked){
				player2_select = player2_selected[i].value;
		}
	}
	
	if(!!player1_select && !!player2_select) gameStart = true;
	console.log(player1_select, player2_select, gameStart)
});

export {player1_select, player2_select, gameStart};