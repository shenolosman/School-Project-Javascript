/**
 * Version of the program
 * @version value="1.0.0"
 */
let version = "1.0.0";


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
    resetScore() {
      this.score = 0;
    }   
    saveHighScore() {
      localStorage.setItem("save", JSON.stringify(this.highscore));
    }
    loadHighScore() {
      let loadScore = +localStorage.getItem("save");
      if (loadScore > 0) {
        this.highscore = loadScore;
        return this.highscore;
      } else {
        return 0;
      }
    }
    uppdateHighScore() {
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
    }
  }
  