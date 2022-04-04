/**************************************************/
/*                   DIFFICULTY                   */
/**************************************************/
/*                                                */
/* Everything related to the difficulty settings. */
/*                                                */
/**************************************************/

// Difficulty buttons
const easyDiff = document.getElementById('diff1');
const mediumDiff = document.getElementById('diff2');
const hardDiff = document.getElementById('diff3');
const extremeDiff = document.getElementById('diff4');

// For updating the description's range number,
// when switching difficulty
const rangeNumber = document.getElementById('rangeNumber');

// Setting up the activeDiffBTN variable for updating the rangeNumber
let activeDiffBTN = easyDiff;

// Creating range values for the difficulties
let easyRange = 10;
let mediumRange = 100;
let hardRange = 1000;
let extremeRange = 10000;

// Setting the initial range to the easy difficulty
let randomRange = easyRange;

// Function for properly updating the difficulty
function updateDifficulty(diff) {

    // Updating the difficulty button state, 
    // if the current pressed button is not the active one
    if (activeDiffBTN != diff) {
        activeDiffBTN.classList.remove('active');
        activeDiffBTN = diff;
        activeDiffBTN.classList.add('active');

        // Updating the range, depending on active difficulty
        switch(diff) {
            case easyDiff: randomRange = easyRange; break;
            case mediumDiff: randomRange = mediumRange; break;
            case hardDiff: randomRange = hardRange; break;
            case extremeDiff: randomRange = extremeRange; break;
        }

        // Update the rangeNumber for the description's span element
        rangeNumber.innerHTML = randomRange;
    }
}

// Set level to 1 for navigating difficulty setting with arrow keys
let level = 1;

// function for properly adjusting difficulty with arrow key
function changeDifficulty(i) {
    if (i == 1) {
        ++level
        if (level == 5) { level = 1; }
    } else {
        --level
        if (level == 0) { level = 4; }
    }

    switch(level) {
        case 1: updateDifficulty(easyDiff); break;
        case 2: updateDifficulty(mediumDiff); break;
        case 3: updateDifficulty(hardDiff); break;
        case 4: updateDifficulty(extremeDiff); break;
    }
}

// Listeners for the difficulty buttons, firing the updateDifficulty function
easyDiff.addEventListener('click', function() { updateDifficulty(easyDiff); });
mediumDiff.addEventListener('click', function() { updateDifficulty(mediumDiff); });
hardDiff.addEventListener('click', function() { updateDifficulty(hardDiff); });
extremeDiff.addEventListener('click', function() { updateDifficulty(extremeDiff); });


/**************************************************/
/*                   Game Input                   */
/**************************************************/
/*                                                */
/* Everything related to the game input.          */
/*                                                */
/**************************************************/

// Keypad buttons
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const num4 = document.getElementById('num4');
const num5 = document.getElementById('num5');
const num6 = document.getElementById('num6');
const num7 = document.getElementById('num7');
const num8 = document.getElementById('num8');
const num9 = document.getElementById('num9');
const num0 = document.getElementById('num0');
const delBTN = document.getElementById('del');
const submitBTN = document.getElementById('submit');
const closeBTN = document.getElementById('close');

// Display info and input elements
const input = document.getElementById('input');
const statusInfo = document.getElementById('statusInfo');

// Creating an empty array for the current input
let currentInput = [];

// Function for creating an underscore input indicator
function createInputIndicator() {
    input.innerHTML = '<span>_</span>';
}

// Function for correctly updating the displayed input and guessNum
function updateInput() {

    // Updates the input display and the guess number with the current input
    input.innerHTML = currentInput.join('');
    guessNum = currentInput.join('');

    // Turns the input to undefined, necessary for the function submitGuess()
    // so the game can let the user know to enter a number after submitting.
    if (currentInput.length == 0) {

        guessNum = undefined;
        createInputIndicator();
    }
}

// Check state of the game, to adjust input methods if the button is used for
// submitting input or restarting the game
//Relevant for keyboard and keypad input
function checkSubmitCondition() {
    if (counter != 3 && gameState == true) {
        submitGuess();
    } else if (counter == 3 && guessNum == undefined) {
        startGame();
    } else {
        startGame(); 
    }
}

// Pushing correct input to array from button press
function buttonInput(btn) {

    if (currentInput.length <= 4) {
        // switch for the input buttons: appending to array, deleting from array, submit
        switch(btn) {
            case 1: currentInput.push(1); break;
            case 2: currentInput.push(2); break;
            case 3: currentInput.push(3); break;
            case 4: currentInput.push(4); break;
            case 5: currentInput.push(5); break;
            case 6: currentInput.push(6); break;
            case 7: currentInput.push(7); break;
            case 8: currentInput.push(8); break;
            case 9: currentInput.push(9); break;
            case 0: currentInput.push(0); break;
            case 'del': currentInput.pop(); break;
            case 'submit': checkSubmitCondition(); break;
            case 'close': closeGame(); break;
        }
    } else {
        // switch for the input from the keyboard
        switch(btn) {
            case 'del': currentInput.pop(); break;
            case 'submit': checkSubmitCondition(); break;
            case 'close': closeGame(); break;
            default: statusInfo.innerHTML = 'Too many characters!';
        }
    }

    updateInput();
}

// Pushing correct input to array from keyboard key press
function keyboardInput(event) {

    // switch for input on info screen
    switch(event.key) {
        case 'ArrowLeft': if(infoScreen.style.display != 'none') { changeDifficulty(0); } break;
        case 'ArrowRight': if(infoScreen.style.display != 'none') { changeDifficulty(1); } break;
        case 'ArrowUp': if(infoScreen.style.display != 'none') { changeDifficulty(0); } break;
        case 'ArrowDown': if(infoScreen.style.display != 'none') { changeDifficulty(1); } break;
        case 'Enter': if(infoScreen.style.display != 'none') { startGame(); closeInfo(); } break;
        case 'Escape': closeGame();
    }

    if (currentInput.length <= 4) {

        // switch for input ingame
        switch(event.key) {
            case '1': currentInput.push(1); break ;
            case '2': currentInput.push(2); break;
            case '3': currentInput.push(3); break;
            case '4': currentInput.push(4); break;
            case '5': currentInput.push(5); break;
            case '6': currentInput.push(6); break;
            case '7': currentInput.push(7); break;
            case '8': currentInput.push(8); break;
            case '9': currentInput.push(9); break;
            case '0': currentInput.push(0); break;
            case 'Backspace': currentInput.pop(); break;
            case 'Delete': deleteInput(); break;
            case 'Enter': checkSubmitCondition(); break;
        }
    } else {
        // switch for input ingame, when input has too many characters
        switch(event.key) {
            case 'Backspace': currentInput.pop(); break;
            case 'Delete': deleteInput(); break;
            case 'Enter': checkSubmitCondition(); break;
            default: statusInfo.innerHTML = 'Too many characters!'; break;
        }
    }

    updateInput();
}

// function for deleting all input out of currentInput
function deleteInput() {
    for(currentInput.length; currentInput.length > 0;) { currentInput.pop(); };
}

function submitGuess() {
    // increment counter if submit was a number
    if (guessNum != undefined) { ++counter; }

    if (counter <= 3) {
        if (guessNum == randomNum) {

            statusInfo.innerHTML = 'Congratulations, you won!';
            submitBTN.innerHTML = 'Restart';
            gameState = false;

        } else if (counter == 3) {

            statusInfo.innerHTML = 'Too bad, you have lost the game.';
            submitBTN.innerHTML = 'Restart';

        } else if (guessNum == undefined) {

            statusInfo.innerHTML = 'Please enter a number!';

        } else {

            statusInfo.innerHTML = 'Wrong, you can guess ' + (3 - counter) + ((counter == 2) ? ' more time!' : ' more times!');
        }
    }
}

// Listeners for the input buttons: updating input and submitting input
num1.addEventListener('click', function() { buttonInput(1); });
num2.addEventListener('click', function() { buttonInput(2); });
num3.addEventListener('click', function() { buttonInput(3); });
num4.addEventListener('click', function() { buttonInput(4); });
num5.addEventListener('click', function() { buttonInput(5); });
num6.addEventListener('click', function() { buttonInput(6); });
num7.addEventListener('click', function() { buttonInput(7); });
num8.addEventListener('click', function() { buttonInput(8); });
num9.addEventListener('click', function() { buttonInput(9); });
num0.addEventListener('click', function() { buttonInput(0); });
delBTN.addEventListener('click', function() { buttonInput('del'); });
submitBTN.addEventListener('click', function() { buttonInput('submit'); });
closeBTN.addEventListener('click', function() { buttonInput('close'); });

// Listener for keyboard key press
document.addEventListener('keydown', keyboardInput);

/**************************************************/
/*                      Game                      */
/**************************************************/
/*                                                */
/* Everything related to starting, restarting     */
/* the game.                                      */
/*                                                */
/**************************************************/

// Game start / restart buttons
const startBTN = document.getElementById('start');

// Defining variables for the random number and guessed number
let randomNum;
let guessNum;

// Giving the guess counter an initial value of 0
let counter = 0;

// Setting up initial state of the game, relevant for input to behave correctly
let gameState = true;

// SVG Icon for the submit button innerHtml
const submitIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" class="svg--icon"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z"/></svg>';

// Function for starting and restarting the game
function startGame() {

    // Reset the counter, draw a new random number, reset guessNum
    randomNum = Math.floor(Math.random() * randomRange + 1);
    counter = 0;
    guessNum = undefined;
    gameState = true;

    // Turn restart button back to submit button
    submitBTN.innerHTML = submitIcon;

    // Delete all input and update status info
    createInputIndicator();
    deleteInput();
    statusInfo.innerHTML = 'You can guess 3 more times!';

    // Console logging correct answer, for debugging
    console.log(randomNum);
}

// Function for closing the info screen, when starting the game
function closeInfo() {
    infoScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
}

// Function for returning to the info screen
function closeGame() {
    infoScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    gameState = false;
}

// Info page and game page elements
const infoScreen = document.getElementById('info');
const gameScreen = document.getElementById('game');

// Listener for the game start button
startBTN.addEventListener('click', function() { startGame(); closeInfo(); });