
const greenButton = document.getElementById("green");
const redButton = document.getElementById("red");
const yellowButton = document.getElementById("yellow");
const blueButton = document.getElementById("blue");

const startButton = document.getElementById("start-btn");

const message = document.getElementById("message");

const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");




const colors = ["green", "red", "yellow", "blue"];

let gameSequence = [];

let playerSequence = [];

let level = 0;

let score = 0;

let gameStarted = false;

let acceptingInput = false;


function getButton(color) {

    if (color === "green") {
        return greenButton;
    }

    if (color === "red") {
        return redButton;
    }

    if (color === "yellow") {
        return yellowButton;
    }

    if (color === "blue") {
        return blueButton;
    }
}

function flashButton(color) {

    const button = getButton(color);

    button.classList.add("flash");

    setTimeout(() => {
        button.classList.remove("flash");
    }, 400);
}

function getRandomColor() {

    const randomIndex =
        Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}

function playSequence() {

    acceptingInput = false;

    playerSequence = [];

    message.textContent = "Watch the sequence...";

    let i = 0;

    const interval = setInterval(() => {

        flashButton(gameSequence[i]);

        i++;

        if (i >= gameSequence.length) {

            clearInterval(interval);

            setTimeout(() => {

                acceptingInput = true;

                message.textContent =
                    "Your turn! Repeat the sequence.";

            }, 500);
        }

    }, 700);
}


function nextLevel() {

    level++;

    levelDisplay.textContent = level;

    // Add a new random color
    const randomColor = getRandomColor();

    gameSequence.push(randomColor);

    playSequence();
}

function startGame() {

    gameStarted = true;

    gameSequence = [];

    playerSequence = [];

    level = 0;

    score = 0;

    scoreDisplay.textContent = score;

    levelDisplay.textContent = level;

    document.body.classList.remove("game-over");

    startButton.textContent = "Restart Game";

    message.textContent = "Get ready...";

    acceptingInput = false;

    setTimeout(() => {

        nextLevel();

    }, 1000);
}


function checkAnswer(color) {

    const currentIndex = playerSequence.length - 1;

    // Check whether the clicked color is correct
    if (playerSequence[currentIndex] !==
        gameSequence[currentIndex]) {

        gameOver();

        return;
    }

    // Check whether the complete sequence is correct
    if (playerSequence.length === gameSequence.length) {

        score += 10;

        scoreDisplay.textContent = score;

        acceptingInput = false;

        message.textContent = "Correct! Next level...";

        setTimeout(() => {

            nextLevel();

        }, 1000);
    }
}


function handleColorClick(color) {

    // Do nothing if game hasn't started
    if (!gameStarted) {
        return;
    }

    // Do nothing while computer is showing sequence
    if (!acceptingInput) {
        return;
    }

    // Flash clicked button
    flashButton(color);

    // Add player's choice
    playerSequence.push(color);

    // Check answer
    checkAnswer(color);
}


function gameOver() {

    acceptingInput = false;

    gameStarted = false;

    document.body.classList.add("game-over");

    message.textContent =
        `Game Over! Your score was ${score}.`;

    startButton.textContent = "Play Again";

    // Flash all buttons
    greenButton.classList.add("flash");
    redButton.classList.add("flash");
    yellowButton.classList.add("flash");
    blueButton.classList.add("flash");

    setTimeout(() => {

        greenButton.classList.remove("flash");
        redButton.classList.remove("flash");
        yellowButton.classList.remove("flash");
        blueButton.classList.remove("flash");

    }, 500);
}


greenButton.addEventListener("click", () => {

    handleColorClick("green");

});

redButton.addEventListener("click", () => {

    handleColorClick("red");

});

yellowButton.addEventListener("click", () => {

    handleColorClick("yellow");

});

blueButton.addEventListener("click", () => {

    handleColorClick("blue");

});

startButton.addEventListener("click", () => {

    startGame();

});
