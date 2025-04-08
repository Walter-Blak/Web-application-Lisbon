class Game {
    
    gameState = {
        numbers:[5],
        guess:0,
    }

    guessHigher=()=>1;
    guessLower=()=>2;
    
    isCorrect=(guess,previousNumber, answer)=>{
        if(guess===0)return false;
        console.log("guess" + guess.toString());
        console.log("guess" + guess.toString());
        return guess === 1? answer >= previousNumber : guess === 2 ? answer <= previousNumber : false;
    }

    revealNextNumber = () => {
        var number = Math.floor(Math.random() * Math.floor(11))
        return number;
    }

}

export default Game