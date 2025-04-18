import { useEffect, useState } from 'react';
import SingleCard from '../components/memoryGame/SingleCard';
import '../css/memoryGame.css';

//copy to each page 
import { useLocation, useNavigate } from 'react-router';
import ScoreTable from '../components/ScoreTable';
import AddScore from '../components/AddScore';
import GetScore from '../components/GetScore';
import ButtonReturn from '../components/ButtonReturn';

const cardImages = [
  { "src": "../imgMemory/Barcelona.png", matched: false  },
  { "src": "../imgMemory/Benfica.png", matched: false },
  { "src": "../imgMemory/BVB.png", matched: false },
  { "src": "../imgMemory/Celtic.png", matched: false },
  { "src": "../imgMemory/Chemik.png", matched: false },
  { "src": "../imgMemory/Pogon.png", matched: false }
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [scoreTable, setScoreTable] = useState([]);
  const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer
  
  //copy to each page from this
  const {state} = useLocation();
  const userName = state; 
  useEffect(() => {
          if(gameEnded && userName){
              console.warn("useEffect where AddScore if starts", turns);
              AddScore({ score: turns, userName: userName.username, game: "MemoryGame", SM: "smaller" });
          }
  }, [gameEnded, userName]);

  useEffect(() => {
    const fetchScoreTable = async () => {
      const scoreData = await GetScore({ miniGame: "MemoryGame", SM: "smaller" });
      console.warn(scoreData);
      setScoreTable(scoreData);
    };
  
    fetchScoreTable(); // pierwsze pobranie
  
    const intervalId = setInterval(() => {
      fetchScoreTable(); // odświeżanie co 5s
    }, 5000);
  
    return () => clearInterval(intervalId);
    }, []);
    const navigate = useNavigate();
    const sendUserNameToGamesPage = () => {
      navigate(`/gamesPage`, {state: {username: userName.username}});
    }     
    // to this
      

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => (
            card.src === choiceOne.src ? { ...card, matched: true } : card
          ));
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
    setGameEnded(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameOver(true);
      setGameEnded(true);
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = "../imgMemory/boxdel.gif";
    preloadImage.onload = () => setGifLoaded(true);
  }, []);



  return (
    <div >
      <ScoreTable scoreTable={scoreTable} />
      <span onClick={() => sendUserNameToGamesPage()}>
        <ButtonReturn />
      </span>
      <div className="App">
        <h1 id="h1mg">Memory Game!</h1>
        <button id="b1nw" onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p id="turns-counter">Turns: {turns}</p>

        {gameOver && gifLoaded && (
          <div id="game-over">
            <div id="message">
              <h2>WOW GOOD JOB!!!</h2>
            </div>
            <img src="../imgMemory/boxdel.gif" alt="Celebration" />
          </div>
        )}

      </div>
    </div>
  );
}

export default MemoryGame;
