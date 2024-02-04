function renderEasy(cardColumn, card, isMobile) {
  cardColumn.classList.add(
    "col-3",
    "col-md-3",
    "gb-3",
    "gx-2",
    "gx-md-3",
    "mb-2",
    "mb-md-3",
    "text-center"
  );

  !isMobile ? (card.style.height = "32vh") : "";
}

function renderMedium(cardColumn, card, isMobile) {
  cardColumn.classList.add(
    "col-3",
    "col-md-3",
    "gb-3",
    "gx-2",
    "gx-md-1",
    "mb-2",
    "mb-md-3",
    "text-center"
  );

  !isMobile ? (card.style.height = "22vh") : "";
  !isMobile ? (card.style.width = "20vh") : "";
  !isMobile ? (cardColumn.style.width = "22vh") : "";
  !isMobile ? (cardColumn.style.height = "22vh") : "";
}

function renderHard(cardColumn, card, isMobile) {
  cardColumn.classList.add(
    "col-3",
    "col-md-3",
    "gb-3",
    "gx-0",
    "gx-md-0",
    "mb-2",
    "mb-md-2",
    "text-center"
  );

  function hardDesktopRender() {
    card.style.height = "99%";
    card.style.width = "90%";
    cardColumn.style.width = "20vh";
    cardColumn.style.height = "18vh";
  }

  function hardMobileRender() {
    card.style.height = "99%";
    card.style.width = "90%";
    cardColumn.style.width = "10vh";
    cardColumn.style.height = "13vh";
  }

  !isMobile ? hardDesktopRender() : hardMobileRender();
}

function renderRows(cardRow) {
  cardRow.classList.add("row", "row1", "d-flex", "justify-content-center");
}
