
const USER_WINS = 0;
const CPU_WINS = 1;
const TIE = 2;

function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

function userPlay() {
	/* get input from console */
//	let playerSelection = (prompt("Select: ROCK[R]/ PAPER[P] / SCISSORS?[S]")).toUpperCase();
	let playerSelection = prompt("Select: ROCK[R]/ PAPER[P] / SCISSORS?[S]");
	playerSelection = playerSelection.toUpperCase();
	while (! isString(playerSelection) || ! playerSelection.startsWith("R") && ! playerSelection.startsWith("P")  && ! playerSelection.startsWith("S") ) {
		console.log("I don't understand. Try again...");
		playerSelection = prompt("Select: ROCK[R]/ PAPER[P] / SCISSORS?[S]");
		playerSelection = playerSelection.toUpperCase();
	}
	switch (playerSelection.charAt(0)) {
		case "R":
			 playerSelection = "ROCK";
		break;
		case "P":
			 playerSelection = "PAPER";
		break;		
		case "S":
			 playerSelection = "SCISSORS";
		break;
		default:
			throw new Error ("Wrong value: playerSelection = " + playerSelection);
		break;
	}
	/* print USER selection */
	console.log("USER plays... " + playerSelection);
	return playerSelection;
}

function computerPlay() {
	/* draw R P or S (random) */
	/* print CPU selection */
	let CPUSelection = Math.floor(Math.random() * 3);
	switch (CPUSelection) {
		case 0:
			 CPUSelection = "ROCK";
		break;
		case 1:
			 CPUSelection = "PAPER";
		break;		
		case 2:
			 CPUSelection = "SCISSORS";
		break;
		default:
			throw new Error ("Wrong value: CPUSelection = " + CPUSelection);
		break;
	}
	console.log("CPU plays... " + CPUSelection);
	return CPUSelection;
}

function playRound(playerSelection, CPUSelection) {
	/* compare selections */
	if (playerSelection == "ROCK") {
		switch (CPUSelection) {
			case "ROCK":
				winner = TIE;
			break;
			case "PAPER":
				winner = CPU_WINS;
			break;
			case "SCISSORS":
				winner = USER_WINS;
			break;
		}
	}
	if (playerSelection == "PAPER") {
		switch (CPUSelection) {
			case "ROCK":
				winner = USER_WINS;
			break;
			case "PAPER":
				winner = TIE;
			break;
			case "SCISSORS":
				winner = CPU_WINS;
			break;
		}
	}
	if (playerSelection == "SCISSORS") {
		switch (CPUSelection) {
			case "ROCK":
				winner = CPU_WINS;
			break;
			case "PAPER":
				winner = USER_WINS;
			break;
			case "SCISSORS":
				winner = TIE;
			break;
		}
	}
	return winner;
}

function game() {
	
	let winner = playRound(userPlay(), computerPlay());
	if (winner == USER_WINS) {
		console.log("USER wins");
	} else if (winner == CPU_WINS) {
		console.log("CPU wins");
	} else {
		console.log("It's a Tie!");
	}
}

for (let i = 1 ; i <= 5; i++) {
	game();
}

