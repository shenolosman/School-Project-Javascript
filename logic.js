/**
 * Version of the program
 * @version value="1.0.0"
 */
 let version = "1.0.0";

 /**
  * Saving scores to local storage
  * @constructor
  */
 export class MemoryGame {
   constructor() {
     let array = Array;
     let numberOfCards = 0;
     this.shuffle(array);
     this.chooseRandomColors(numberOfCards);
   }
   allColors = [
     "orange",
     "red",
     "cyan",
     "yellow",
     "blue",
     "purple",
     "green",
     "pink",
   ];
   colors = [];
   tempAllColors = [];
   shuffle(array) {
     for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * i);
       const temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
   }
   chooseRandomColors(numberOfCards) {
     let tempAllColors = [];
     this.allColors.forEach((item) => {
       tempAllColors.push(item);
     });
     this.shuffle(tempAllColors);
 
     for (let i = 0; i < numberOfCards; i++) {
       this.colors.push(tempAllColors[i]);
     }
   }
 }
 
 /**
  * Saving scores to local storage
  * @constructor
  */
 export class TotalScore {
   constructor() {
     this.score = 0;
     this.highscore = 0;
     this.loadHighScore();
   }
   scoreCounter;
   highScoreCounter;
   resetScore() {
     this.score = 0;
   }
   uppdateHighScore() {
     if (this.score > this.highscore) {
       this.highscore = this.score;
     }
   }
   saveHighScore() {
     localStorage.setItem("save", JSON.stringify(this.highscore));
   }
   loadHighScore() {
     let loadScore = localStorage.getItem("save");
     if (loadScore > 0) {
       this.highscore = loadScore;
       return this.highscore;
     } else {
       return 0;
     }
   }
   updateScore() {
     if (this.score > 0 && this.score == this.highscore) {
       document.querySelector(".highscore").textContent = this.score + " points";
       this.saveHighScore();
     }
   }
   printHighScore() {
     let printhighScore = this.loadHighScore();
     if (printhighScore != "undefined")
       document.querySelector(".highscore").textContent =
         printhighScore + " points";
   }
 } 