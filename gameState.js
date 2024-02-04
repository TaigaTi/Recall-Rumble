// Pick a game mode
function setGameMode(gameModes, gameMode, renderCards, resetScore) {
  let modeButtons = [];

  for (let mode of gameModes.keys()) {
    modeButtons.push(document.getElementById(mode));
  }

  // Set the initial game mode
  for (let button of modeButtons) {
    if (button.id == gameMode) {
      button.classList.add("current-game-mode");
    }
  }

  // Check for game mode changes
  for (let button of modeButtons) {
    button.addEventListener("click", function () {
      button.classList.add("current-game-mode");
      resetScore();
      printScore(0);
      resetButtons(modeButtons, button);
      gameMode = button.id;
      renderCards(gameMode);
    });
  }
  return gameMode;
}

// Start a new game
function newGame(resetCards, gameMode, resetScore, renderCards) {
  let newGame = document.getElementsByClassName("new-button");

  newGame[0].addEventListener("click", function () {
    resetCards();

    // Reset score
    let score = resetScore();
    printScore(score);

    // Remove old cards
    setTimeout(function () {
      renderCards(gameMode);
    }, 500);
  });
}

// Handle game over
function gameOver(
  isGameOver,
  gameMode,
  gameModes,
  resetCards,
  resetScore,
  renderCards
) {
  let faceUp = document.getElementsByClassName("card-flipped");

  if (faceUp.length == gameModes.get(gameMode) && !isGameOver) {
    gameOverMessage(resetCards, gameMode, resetScore, renderCards);

    isGameOver = true;
  }
}

// Reset button colours if not selected
function resetButtons(modeButtons, selected) {
  for (let button of modeButtons) {
    if (selected != button) {
      button.classList.remove("current-game-mode");
    }
  }
}

// Output current score to the screen
function printScore(score) {
  let scoreDiv = document.getElementById("score").getElementsByTagName("h3");
  scoreDiv[0].textContent = "Score: " + score;
}

function gameOverMessage(resetCards, gameMode, resetScore, renderCards) {
  let myModal = document.getElementById("exampleModalCenter");
  let button = document.getElementById("new-game");
  let modalVideo = document.getElementById("modalVideo");

  $(myModal).modal("show");

  setTimeout(function () {
    // Autoplay the video
    modalVideo.play();
  }, 420);

  button.onclick = function () {
    setTimeout(function () {
      resetCards();
    }, 300);

    // Reset score
    let score = resetScore();
    printScore(score);

    // Remove old cards
    setTimeout(function () {
      renderCards(gameMode);
    }, 600);
  };
}
