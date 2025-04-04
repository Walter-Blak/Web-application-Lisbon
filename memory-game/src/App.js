import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/Barcelona.png", matched: false  },
  { "src": "/img/Benfica.png", matched: false },
  { "src": "/img/BVB.png", matched: false },
  { "src": "/img/Celtic.png", matched: false },
  { "src": "/img/Chemik.png", matched: false },
  { "src": "/img/Pogon.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

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
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = "/img/boxdel.gif";
    preloadImage.onload = () => setGifLoaded(true);
  }, []);

  return (
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
          <img src="/img/boxdel.gif" alt="Celebration" />
        </div>
      )}
    </div>
  );
}

export default App;
