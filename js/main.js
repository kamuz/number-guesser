/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a central amount of guesses
- Notify the player of guesses remaining
- Nofify the player of the correct answer if loose
- Let the player choose to play again
 */

// Game value
let min = 1,
	max = 10,
	winningNum = 2,
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', function(e){
	let guess = parseInt(guessInput.value);

	// Validate
	if(isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	} else {
		// Check if won
		if(guess === winningNum) {
			// Game over - win
			gameAction(true, true,`${winningNum} is correct, YOU WIN!`)
		} else {
			// Wrong number
			guessesLeft--;

			if(guessesLeft === 0) {
				// Game over - lost
				gameAction(false, true, `Game Over, you lost. The correct number was ${winningNum}`);
			} else {
				// Game continues - answer wrong
				gameAction(false, false, `${guess} is not correct, ${guessesLeft} guesses left`);
			}
		}
	}
});

// Game over
function gameAction(won, end, msg){
	let color;
	won === true ? color = 'green' : color = 'red';
	// Change border color
	guessInput.style.borderColor = color;
	// Clear input
	guessInput.value = '';
	// Disable input
	guessInput.disabled = end;
	// Tell user its the wrong number
	setMessage(msg, color);
	// Change button value
	end === true ? guessBtn.value = 'Play Again' : '';
	// Add button class name
	end === true ? guessBtn.className = 'play-again' : '';
}

// Set message
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}