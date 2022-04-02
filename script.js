import { TotalScore } from "./logic.js";
import { MemoryGame } from "./logic.js";
const memoryGame = new MemoryGame();
const totalScore = new TotalScore();
const gameBoard = document.querySelector(".game-board");
const createButton = document.querySelector(".btn-create");
const levelMenu = document.querySelector("#level_menu");
const scorePlayer = document.querySelector(".score");
const scoreHighest = document.querySelector(".highscore");
const youWinHtml = document.querySelector(".content p");

let selectedOption = levelMenu.value;

let firstCard;
let secondCard;
let firstCardColor;
let secondCardColor;

memoryGame.colors = [];
levelMenu.addEventListener("change", menuChange);
createButton.addEventListener("click", createBoard);

function menuChange() {
  selectedOption = this.value;
  memoryGame.colors = [];
  switch (selectedOption) {
    case "easy":
      memoryGame.chooseRandomColors(4);
      break;
    case "medium":
      memoryGame.chooseRandomColors(5);
      break;
    case "hard":
      memoryGame.chooseRandomColors(6);
      break;
    default:
      memoryGame.chooseRandomColors(4);
  }
}

function createBoard() {
  youWinHtml.innerText = "";
  totalScore.scoreCounter = 0;
  scorePlayer.textContent = totalScore.scoreCounter + " points";
  totalScore.highScoreCounter = totalScore.score;
  totalScore.printHighScore();
  let pickedColors = [];
  for (let i = 0; i < memoryGame.colors.length; i++) {
    pickedColors.push(memoryGame.colors[i]);
    pickedColors.push(memoryGame.colors[i]);
  }
  memoryGame.shuffle(pickedColors);
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

function handleClick(event) {
  event.target;
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

function checkSameCards() {
  if (firstCard !== secondCard && firstCardColor === secondCardColor) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    totalScore.highScoreCounter++;
    totalScore.scoreCounter++;
    scorePlayer.textContent = totalScore.scoreCounter + " points";
    scoreHighest.textContent = totalScore.highScoreCounter + " points";
    totalScore.uppdateHighScore();
    checkMatchedCards();
    totalScore.updateScore();
  } else {
    firstCard.firstElementChild.classList.toggle("animate");
    secondCard.firstElementChild.classList.toggle("animate");
  }
}

function checkMatchedCards() {
  const allCards = [...document.querySelectorAll(".flip-card")];
  const isAllOn = allCards.every((item) => {
    return item.classList.contains("matched");
  });
  if (isAllOn) {
    youWinHtml.innerText = "You Win the Game!";
    totalScore.score = totalScore.highScoreCounter;
    totalScore.uppdateHighScore();
  }
}