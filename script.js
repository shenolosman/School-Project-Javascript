// glue-code, (UI-kod, frontend-kod)

const colors = [
  "orange",
  "red",
  "cyan",
  "yellow",
  "blue",
  "purple",
  "green",
  "pink",
];
const cards = [...document.querySelectorAll(".card")];

for (let color of colors) {
  const cardAIndex = parseInt(Math.random() * cards.length);
  const cardA = cards[cardAIndex];
  cards.splice(cardAIndex, 1);
  cardA.className += `${color}`;
  cardA.setAttribute("data-color", color);

  const cardBIndex = parseInt(Math.random() * cards.length);
  const cardB = cards[cardBIndex];
  cards.splice(cardBIndex, 1);
  cardB.className += `${color}`;
  cardB.setAttribute("data-color", color);
}

let clickedCard = null;
let noClickWhileWaiting = false;
let combinationsFound = 0;

function cardClicked(e) {
  const target = e.currentTarget;
  if (
    noClickWhileWaiting ||
    target === clickedCard ||
    target.className.includes("done")
  ) {
    return;
  }
  target.className = target.className.replace("color-hidden", "").trim();
  target.className += " done";

  if (!clickedCard) {
    clickedCard = target;
  } else if (clickedCard) {
    if (
      clickedCard.getAttribute("data-color") !==
      target.getAttribute("data-color")
    ) {
      noClickWhileWaiting = true;
      setTimeout(() => {
        clickedCard.className =
          clickedCard.className.replace("done", "").trim() + " color-hidden";
        target.className =
          target.className.replace("done", "").trim() + " color-hidden";
        clickedCard = null;
        noClickWhileWaiting = false;
      }, 300);
    } else {
      combinationsFound++;
      clickedCard = null;
      if (combinationsFound === 8) {
        alert("You Win!");
      }
    }
  }
}
