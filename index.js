document.addEventListener("DOMContentLoaded", function () {
  let cards = document.getElementsByClassName("card");

  function flipToFront() {
    // Check if a card has been chosen
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        cards[i].classList.toggle("card-flipped");
      });
    }
  }

//   function flipToBack() {
//     // Check if a card has been chosen
//     for (let i = 0; i < cards.length; i++) {
//       if(cards[i].classList.contains("card-flipped")) {
//         cards[i].addEventListener("click", function () {
//             cards[i].classList.remove("card-flipped");
//             cards[i].classList.add("card-unflipped");
//           });
//       }
//     }
//   }

  flipToFront();
//   flipToBack();
});
