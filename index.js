document.addEventListener("DOMContentLoaded", function () {
  let cards = document.getElementsByClassName("card");
  let flipped = [];
  let score = 0;

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

    for (let i = 0; i < cardsFront.length; i++) {
      let img = document.createElement("img");
      let randomImage = getRandomImage(images, imageCounts);

      img.src = randomImage;
      img.classList = "fruits";
      cardsFront[i].appendChild(img);
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
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        // Flip a card if chosen
        if (
          flipped.length < 2 &&
          !cards[i].classList.contains("card-flipped")
        ) {
          cards[i].classList.add("card-flipped");
          flipped.push(cards[i]);
        }

        // If 2 cards flipped and they aren't a match
        if (flipped.length == 2 && !getMatch(flipped)) {
          const card1 = flipped[0];
          const card2 = flipped[1];
          if (score > 0) {
            score-=1;
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
          score+=5;
          printScore();

          card1.removeEventListener("click", flipCard);
          card2.removeEventListener("click", flipCard);
        }

        if (flipped.length == 2) {
          // Reset flip count
          flipped.length = 0;
        }
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

  printScore();
  populateBoard();
  flipCard();
});
