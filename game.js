
const USER_WINS = 0;
const CPU_WINS = 1;
const TIE = 2;

var numberOfUserVictories = 0;
var numberOfCPUVictories = 0;

/*
function isString(value) {
	return typeof value === 'string' || value instanceof String;
}
*/

function userPlay(event) {
	/* get input from mouse click */
	let playerSelection = event.currentTarget.dataset.key;
	playSound(event); // play sound
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

function playGame(event) {
	
	let playerSelection = userPlay(event);
	let CPUSelection = computerPlay();
	
	let winner = playRound(playerSelection, CPUSelection);
	
	if (winner == USER_WINS) {
		console.log("USER wins");
		numberOfUserVictories++;
		winner = "USER";
	} else if (winner == CPU_WINS) {
		console.log("CPU wins");
		numberOfCPUVictories++;
		winner = "CPU";
	} else {
		console.log("It's a Tie!");
		winner = "TIE";
	}
	printStats(playerSelection, CPUSelection, numberOfUserVictories, numberOfCPUVictories, winner);
}

function printStats(playerSelection, CPUSelection, numberOfUserVictories, numberOfCPUVictories, winner) {

	document.getElementById("playerSelection").innerText = playerSelection;
	document.getElementById("CPUSelection").innerText = CPUSelection;
	document.getElementById("numberOfUserVictories").innerText = numberOfUserVictories;
	document.getElementById("numberOfCPUVictories").innerText = numberOfCPUVictories;
	document.getElementById("winner").innerText = winner;
}

function resetStats() {
	event.currentTarget.classList.add("playing");
	numberOfUserVictories = 0;
	numberOfCPUVictories = 0;
	printStats("-", "-", numberOfUserVictories, numberOfCPUVictories, "-");
}

/*
for (let i = 1 ; i <= 5; i++) {
	playGame();
}*/

// Add mouse event listeners to each 'div'
let buttons = document.querySelectorAll(".button");
buttons.forEach( function (button) {
	button.addEventListener("mousedown", playGame);
	button.addEventListener("mouseup", removeClassPlaying);
});

let resetButton = document.querySelector(".resetButton");
resetButton.addEventListener("mousedown", resetStats);
resetButton.addEventListener("mouseup", removeClassPlaying);

// Play sound according to data-key
function playSound(event) {
	let audio = null;
	if (event.type == "mousedown") {
		event.currentTarget.classList.add("playing");
		// currentTarget devuelve el elemento que recibe la respuesta del evento (aunque clickeemos en uno de sus hijos), es decir el 'div' que es donde hemos añadido los eventListeners
		audio = document.querySelector("audio[data-key='" + event.currentTarget.dataset.key + "']");
		// add class 'playing' for visual effect
		event.currentTarget.classList.add("playing");
	}
	let promise = audio.play();
	if (promise !== undefined) {
		promise.then (_ => {
		// Autoplay started!
		console.log("Autoplay started!");
		}).catch(error => {
		// Autoplay was prevented.
		// Show a "Play" button so that user can start playback.
		console.log("Autoplay was prevented.");
		});
	}
}

function removeClassPlaying(event) {
	if (event.type == "mouseup") {
		event.currentTarget.classList.remove("playing");
	}
}

