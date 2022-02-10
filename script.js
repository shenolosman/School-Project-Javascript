//glue-code
import { TotalScore } from "./logic.js";
const totalScore = new TotalScore();

document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.querySelector(".game-board");
  const createButton = document.querySelector(".btn-create");
  const levelMenu = document.querySelector("#level_menu");

  let selectedOption = levelMenu.value;

  let allColors = [
    "orange",
    "red",
    "cyan",
    "yellow",
    "blue",
    "purple",
    "green",
    "pink",
  ];
  let colors = [];
  levelMenu.addEventListener("change", function () {
    selectedOption = this.value;
    colors = [];
    switch (selectedOption) {
      case "easy":
        chooseRandomColors(4);
        break;
      case "medium":
        chooseRandomColors(5);
        break;
      case "hard":
        chooseRandomColors(6);
        break;
      default:
        chooseRandomColors(4);
    }
  });
  function chooseRandomColors(numberOfCards) {
    let tempAllColors = [];
    allColors.forEach((item) => {
      tempAllColors.push(item);
    });
    shuffle(tempAllColors);

    for (let i = 0; i < numberOfCards; i++) {
      colors.push(tempAllColors[i]);
    }
  }
  createButton.addEventListener("click", createBoard);
  let firstCard;
  let secondCard;
  let firstCardColor;
  let secondCardColor;
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  let scoreCounter = 0;
  function createBoard() {
    updateScore(scoreCounter);
    printHighScore();
    let pickedColors = [];

    for (let i = 0; i < colors.length; i++) {
      pickedColors.push(colors[i]);
      pickedColors.push(colors[i]);
    }

    shuffle(pickedColors);

    if (gameBoard.children.length === 0) {
      for (let i = 0; i < pickedColors.length; i++) {
        let cardContainer = document.createElement("div");
        let innerCard = document.createElement("div");
        let frontCard = document.createElement("div");
        let backCard = document.createElement("div");

        cardContainer.setAttribute("id", i);
        cardContainer.setAttribute("class", "flip-card");
        innerCard.setAttribute("class", "flip-card-inner");

        frontCard.setAttribute("class", "flip-card-front");

        frontCard.style.backgroundColor = pickedColors[i];

        backCard.setAttribute("class", "flip-card-back");

        gameBoard.appendChild(cardContainer);
        cardContainer.appendChild(innerCard);

        innerCard.appendChild(backCard);
        innerCard.appendChild(frontCard);
        gameBoard.appendChild(cardContainer);
      }

      document.querySelectorAll(".flip-card").forEach((item) => {
        item.addEventListener("click", handleClick);
      });

      function handleClick(event) {
        if (this.classList.contains("matched")) {
        } else {
          const numberOfOnCards = CardsOn();
          if (numberOfOnCards === 0) {
            this.firstElementChild.classList.toggle("animate");
            firstCardColor =
              this.firstElementChild.childNodes[1].style.backgroundColor;
            firstCard = this;
          } else if (numberOfOnCards === 1) {
            this.firstElementChild.classList.toggle("animate");
            secondCardColor =
              this.firstElementChild.childNodes[1].style.backgroundColor;
            secondCard = this;
            setTimeout(checkSameCards, 500);
          } else {
          }
        }
      }
    } else {
      gameBoard.innerHTML = "";
      createBoard();
    }
  }
  function CardsOn() {
    let counter = 0;
    const allCards = document.querySelectorAll(".flip-card");
    allCards.forEach((item) => {
      if (
        item.firstElementChild.classList.contains("animate") &&
        !item.classList.contains("matched")
      ) {
        counter++;
      }
    });
    return counter;
  }

  function checkSameCards() {
    if (firstCard !== secondCard && firstCardColor === secondCardColor) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      checkMatchedCards();
      scoreCounter++;
      updateScore(scoreCounter);
    } else {
      firstCard.firstElementChild.classList.toggle("animate");
      secondCard.firstElementChild.classList.toggle("animate");
    }
  }
 
});

function checkMatchedCards() {
  const allCards = [...document.querySelectorAll(".flip-card")];
  const isAllOn = allCards.every((item) => {
    return item.classList.contains("matched");
  });

  if (isAllOn) {
    document.querySelector(".content p").innerText = "You Win the Game!";
    totalScore.uppdateHighScore();
  }
}
function updateScore(value) {
  document.querySelector(".score").innerHTML = value;
  document.querySelector(".highscore").innerHTML = value;
  if (totalScore.score > 0 && totalScore.score === totalScore.highScore) {
    document.querySelector(".highscore").innerText = totalScore.score;
    totalScore.saveHighScore();
  }
}
function printHighScore() {
  let printHighScore = totalScore.loadHighScore();
  document.querySelector(".highscore").innerHTML = printHighScore;
}
