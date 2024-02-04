document.addEventListener("DOMContentLoaded", function () {
  let cards = document.getElementsByClassName("card");
  let isMobile = window.innerWidth < 600 ? true : false;
  let isGameOver = false;
  let gameMode = "easy";
  let flipped = [];
  let score = 0;

  const gameModes = new Map();

  gameModes.set("easy", 8);
  gameModes.set("medium", 12);
  gameModes.set("hard", 16);

  // Add event listener for window resize
  window.addEventListener("resize", function () {
     isMobile = window.innerWidth < 600 ? true : false;
  });

  function removeEventListeners() {
    for (let card of cards) {
      card.removeEventListener("click", flipCard);
    }
  }

  function renderCards(gameMode) {
    let numberOfCards = gameModes.get(gameMode);
    
    let container = document.querySelector(".card-rows");
    let cardRows = [];
    let numberOfRows = 2;

    gameMode == "easy" ? (numberOfRows = 2) : "";
    gameMode == "medium" ? (numberOfRows = 3) : "";
    gameMode == "hard" ? (numberOfRows = 4) : "";

    let numberOfCols = numberOfCards / numberOfRows;

    // Remove existing cards
    container.innerHTML = "";
    removeEventListeners();

    for (let i = 0; i < numberOfRows; i++) {
      cardRows[i] = document.createElement("div");

      // Create new cards based on the selected game mode
      for (let j = 0; j < numberOfCols; j++) {
        let cardColumn = document.createElement("div");

        let card = document.createElement("div");
        card.classList.add("card");

        let cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        let cardFront = document.createElement("div");
        cardFront.classList.add("card-face", "card-front");
        cardFront.textContent = "?";

        cardInner.appendChild(cardFront);
        card.appendChild(cardInner);
        cardColumn.appendChild(card);
        cardRows[i].appendChild(cardColumn);
        container.appendChild(cardRows[i]);

        // Add column styles depending on game mode
        gameMode == "easy" ? renderEasy(cardColumn, card, isMobile) : "";
        gameMode == "medium" ? renderMedium(cardColumn, card, isMobile) : "";
        gameMode == "hard" ? renderHard(cardColumn, card, isMobile) : "";
      }
      renderRows(cardRows[i]);
    }

    // Populate the board with new card images
    populateBoard(gameModes.get(gameMode));

    let fruits = document.getElementsByClassName("fruits");
    for (let fruit of fruits) {
      gameMode == "hard" ? fruit.style.margin = "-1vw 0vw 0vw 0vw": "";
      gameMode == "hard" && isMobile ? fruit.style.margin = "-10vw 0vw 0vw 0vw": "";
    }

    // Re-add event listeners for flipping cards
    flipCard(gameMode);
  }

  // Populate the back of the cards with images
  function populateBoard(numberOfCards) {
    let cards = document.getElementsByClassName("card-inner");
    let images = [
      "images/apple.png",
      "images/banana.png",
      "images/coconut.png",
      "images/grapes.png",
      "images/orange.png",
      "images/watermelon.png",
      "images/pineapple.png",
      "images/strawberry.png",
    ];

    images = images.slice(0, numberOfCards / 2);

    let imageCounts = {};

    for (let card of cards) {
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
  function flipCard(gameMode) {
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
          printScore(score);

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
          printScore(score);

          card1.removeEventListener("click", flipCard);
          card2.removeEventListener("click", flipCard);
        }

        if (flipped.length == 2) {
          // Reset flip count
          flipped.length = 0;
        }

        gameOver(isGameOver, gameMode, gameModes, resetCards, resetScore, renderCards);
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

  function resetScore() {
    score = 0;
    return score;
  }

  gameMode = setGameMode(gameModes, gameMode, renderCards, resetScore);
  renderCards(gameMode);
  printScore(score);
  flipCard(gameMode);
  newGame(resetCards, gameMode, resetScore, renderCards);
});
