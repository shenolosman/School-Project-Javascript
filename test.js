import { TotalScore } from "./logic.js";

const assert = chai.assert;
describe("TotalScore", function () {
  describe("uppdateHighScore", function () {
    it("Uppdaterar högsta score av scores", function () {

      const totalScore = new TotalScore();
      totalScore.score = 0;
      totalScore.highScore = 0;
      console.log("local storage items counts :" + localStorage.length);
      localStorage.clear();
      console.log("local storage items counts :" + localStorage.length);
      assert.equal(0, localStorage.length);
      assert.equal(0, totalScore.score);
      assert.equal(0, totalScore.highScore);
      for (let index = 0; index < 5; index++) {
        totalScore.score = index;
      }

      totalScore.score = 5;
      totalScore.uppdateHighScore();
      console.log("score now :" + totalScore.score);
      assert.equal(5, totalScore.score);
      assert.equal(5, totalScore.highscore);
      totalScore.saveHighScore();
      assert.isNotNull(totalScore.loadHighScore());
      assert.equal(5, totalScore.loadHighScore());
      console.log(
        "loaded higher score from localstorage :" + totalScore.loadHighScore()
      );

      const newHighScore = new TotalScore();
      console.log("new higscore :" + newHighScore.highscore);
      console.log("new score :" + newHighScore.score);
      assert.equal(0, newHighScore.score);
      assert.equal(5, newHighScore.highscore);
      newHighScore.score = 3;
      assert.equal(3,newHighScore.score);
      console.log("new score :" + newHighScore.score);
      assert.equal(5, newHighScore.highscore);
      console.log("new higscore :" + newHighScore.highscore);
      totalScore.uppdateHighScore();
      assert.equal(5, totalScore.loadHighScore());
      console.log(
        "loaded higher score from localstorage :" + totalScore.loadHighScore()
      );
      
      console.log("local storage items counts :" + localStorage.length);
      localStorage.clear();
      console.log("local storage items counts :" + localStorage.length);
      
    });
  });

  describe("score", function () {
    it("kollar score om det stämmer", function () {
      const totalScore = new TotalScore();
      totalScore.score = 5;
      assert.equal(5, totalScore.score);
    });
  });

  describe("highscore", function () {
    it("kollar highscore om det stämmer", function () {
      const totalScore = new TotalScore();
      totalScore.highscore = 6;
      assert.equal(6, totalScore.highscore);
    });
  });
});