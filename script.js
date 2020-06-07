// map constants to sections of the document
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// global variable
var timer = [0,0,0,0];  // array of minutes, seconds, hundredths of seconds, thousandths of seconds
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	"use strict";
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
	"use strict";
	theTimer.innerHTML = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	timer[3]++;     // only increment the last element in the array (thousandths of seconds)

	timer[0] = Math.floor((timer[3]/100)/60);   // no decimals
	timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
	"use strict";
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0, textEntered.length);

	if (textEntered === originText) {    // if all is entered and it matches, then test is done.
		clearInterval(interval);    // stops the continuous checking (similar to chron job)
		testWrapper.style.borderColor = "#429890";  // set to green color
	} else {
		if (textEntered === originTextMatch) {   // if the text entered so far is correct...
			testWrapper.style.borderColor = "#65CCf3";  // set to blue color
		} else {    // if incorrect (mistakes made)
			testWrapper.style.borderColor = "#E95D0F";  // set to orange color
		}
	}
}

// Start the timer:
function start() {
	"use strict";
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning) {
		timerRunning = true;
		interval = setInterval(runTimer, 10);  // 10 = every thousandth of a second; similar to chron job
	}
	console.log(textEnteredLength);
}

// Reset everything:
function reset() {
	"use strict";
	clearInterval(interval);    // ensures that browser isn't running an interval in the background and tying up resources
	interval = null;            // this prevents a different interval from being made the next time it is run
	timer = [0,0,0,0];          // reset / re-initialize the timer array
	timerRunning = false;       // reset timerRunning boolean flag

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);