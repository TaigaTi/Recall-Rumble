document.addEventListener("DOMContentLoaded", function () {
  let cards = document.getElementsByClassName("card");
  let flipped = [];
  let score = 0;
  let isGameOver = false;
  let gameMode = "easy";
  const gameModes = new Map();

  gameModes.set("easy", 9);
  gameModes.set("medium", 12);
  gameModes.set("hard", 16);

  // Pick a game mode
  function setGameMode() {
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
        resetButtons(modeButtons, button);
        gameMode = button.id;
        renderCards();
      });
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

  function renderCards() {
    let numberOfCards = gameModes.get(gameMode);

    numberOfCards ? console.log(numberOfCards) : console.log("no number set");
  }

  // Output current score to the screen
  function printScore() {
    let scoreDiv = document.getElementById("score").getElementsByTagName("h3");
    scoreDiv[0].textContent = "Score: " + score;
  }

  // Populate the back of the cards with images
  function populateBoard() {
    let cardsFront = document.getElementsByClassName("card-inner");
    let images = [
      "images/apple.png",
      "images/banana.png",
      "images/coconut.png",
      "images/grapes.png",
      "images/orange.png",
      "images/watermelon.png",
    ];

    let imageCounts = {};

    for (let card of cardsFront) {
      let img = document.createElement("img");
      let randomImage = getRandomImage(images, imageCounts);

      img.src = randomImage;
      img.classList = "fruits";
      card.appendChild(img);
    }
  }

  // Find a random image
  function getRandomImage(images, imageCounts) {
    let randomIndex = Math.floor(Math.random() * images.length);
    let randomImage = images[randomIndex];

    // Check if the image has already been used twice
    while (imageCounts[randomImage] && imageCounts[randomImage] >= 2) {
      randomIndex = Math.floor(Math.random() * images.length);
      randomImage = images[randomIndex];
    }

    // Update the image count
    imageCounts[randomImage] = (imageCounts[randomImage] || 0) + 1;

    return randomImage;
  }

  // Flip a card when selected
  function flipCard() {
    for (let card of cards) {
      card.addEventListener("click", function () {
        // Flip a card if chosen
        if (flipped.length < 2 && !card.classList.contains("card-flipped")) {
          card.classList.add("card-flipped");
          flipped.push(card);
        }

        // If 2 cards flipped and they aren't a match
        if (flipped.length == 2 && !getMatch(flipped)) {
          const card1 = flipped[0];
          const card2 = flipped[1];
          if (score > 0) {
            score -= 1;
          }
          printScore();

          setTimeout(function () {
            card1.classList.remove("card-flipped");
            card2.classList.remove("card-flipped");
          }, 1000);
        }

        // If 2 cards are a match
        if (flipped.length == 2 && getMatch(flipped)) {
          const card1 = flipped[0];
          const card2 = flipped[1];
          score += 5;
          printScore();

          card1.removeEventListener("click", flipCard);
          card2.removeEventListener("click", flipCard);
        }

        if (flipped.length == 2) {
          // Reset flip count
          flipped.length = 0;
        }

        gameOver();
      });
    }
  }

  // Check if the flipped cards match
  function getMatch(flipped) {
    let image1 = flipped[0].querySelector(".fruits");
    let image2 = flipped[1].querySelector(".fruits");

    if (image1.getAttribute("src") == image2.getAttribute("src")) {
      return true;
    }

    return false;
  }

  // Make all cards face down
  function resetCards() {
    let flipped = document.getElementsByClassName("card-flipped");

    for (let i = flipped.length - 1; i >= 0; i--) {
      flipped[i].classList.remove("card-flipped");
    }
  }

  function newGame() {
    let newGame = document.getElementsByClassName("new-button");
    let cards = document.getElementsByClassName("card-inner");

    newGame[0].addEventListener("click", function () {
      resetCards();

      // Reset score
      score = 0;
      printScore();

      // Remove old card images
      setTimeout(function () {
        for (let i = 0; i < cards.length; i++) {
          let imgElement = cards[i].querySelector("img");
          if (imgElement) {
            cards[i].removeChild(imgElement);
          }
        }

        // Populate new board after removing child images
        populateBoard();
      }, 500);
    });
  }

  function gameOver() {
    let faceUp = document.getElementsByClassName("card-flipped");

    if (faceUp.length == cards.length && !isGameOver) {
      setTimeout(function () {
        alert("You win!");
      }, 500);

      isGameOver = true;
    }
  }

  setGameMode();
  renderCards();
  printScore();
  populateBoard();
  flipCard();
  newGame();
});
