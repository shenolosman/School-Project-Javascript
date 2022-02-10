import { TotalScore } from "./logic.js";

const assert=chai.assert;

describe("SaveScore",function(){
    describe("uppdateHighScore()",function(){
        it("Uppdaterar högsta score av scores",function(){
            const totalScore=new TotalScore();
            let score=1;
            let highScore=2;
            totalScore.uppdateHighScore();
            console.log(totalScore.uppdateHighScore);
        })
    })
})