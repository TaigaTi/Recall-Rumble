document.addEventListener("DOMContentLoaded", function () {
  let cards = document.getElementsByClassName("card");

  // Flip a card if chosen
  function flipCard() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        cards[i].classList.toggle("card-flipped");
      });
      
    }
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

  populateBoard();

  flipCard();
});
