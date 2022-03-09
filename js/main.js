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

// Listen for guess
guessBtn.addEventListener('click', function(e){
	let guess = parseInt(guessInput.value);

	// Validate
	if(isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if won
	if(guess === winningNum) {
		// Game over - win
		// Disable input
		guessInput.disabled = true;
		// Change border color
		guessInput.style.borderColor = 'green';
		// Set message
		setMessage(`${winningNum} is correct, YOU WIN!`, 'green')
	} else {
		// Wrong number
		guessesLeft--;

		if(guessesLeft === 0) {
			// Game over - lost
			// Disable input
			guessInput.disabled = true;
			// Change border color
			guessInput.style.borderColor = 'red';
			// Set message
			setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red')
		} else {
			// Game continues - answer wrong
			// Change border color
			guessInput.style.borderColor = 'red';
			// Clear input
			guessInput.value = '';
			// Tell user its the wrong number
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
		}
	}
});

// Set message
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}