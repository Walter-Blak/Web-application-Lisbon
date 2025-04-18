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
  const [userName, setUserName] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [responseDB, setResponse] = useState('');
  const [scoreTabe, setScoreTable] = useState([]);
  const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer
  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.data.userName && !userName) {
        console.warn("Otrzymano nazwę użytkownika:", event.data.userName);
        setUserName(event.data.userName);
        window.removeEventListener("message", receiveMessage); 
      }
    };
  
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);
  
  useEffect(() => {
          if(gameEnded && userName){
              console.warn("useEffect where AddScore if starts", turns);
              AddScore(turns);
          }
  }, [gameEnded, userName]);
      
  
  const AddScore = async (score) => {
          try {
              console.warn(userName);
              const res = await fetch(`${ip}3010/addScore?score=${userName},MemoryGame,${score},smaller`);            
              const responseText = await res.text();
              console.warn(responseText);
              setScoreTable(responseText);
          } catch (error) {
              console.error("Błąd zapisu wyniku:", error);
              setResponse("Błąd zapisu do bazy");
          }
  };

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

  const getScores = async () => {
    try {
      const dbResponse = await fetch(`${ip}3010/getScore?minigame=MemoryGame,smaller`);
      const jsonResponse = await dbResponse.json();
      console.warn(jsonResponse);

      // Ensure the response is an array
      setScoreTable(Array.isArray(jsonResponse) ? jsonResponse : []);
    } catch (error) {
      console.error("Błąd zapisu wyniku:", error);
      setResponse("Błąd zapisu do bazy");
    }
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
    preloadImage.src = "/img/boxdel.gif";
    preloadImage.onload = () => setGifLoaded(true);
  }, []);

  useEffect(() => {
         getScores(); 
 
         const intervalId = setInterval(() => {
             getScores(); // Refresh scores every 5 seconds
         }, 5000);
 
 
         return () => clearInterval(intervalId);
     }, []);
  return (
    <div >
      <section id="scoreTable">
                <table>
                    <thead>
                        <tr>Users score</tr>
                    </thead>
                    <tbody>
                        {Array.isArray(scoreTabe) && scoreTabe.slice(0, 5).map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.userName}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
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
    </div>
  );
}

export default App;
