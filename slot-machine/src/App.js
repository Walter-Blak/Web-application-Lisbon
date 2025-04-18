import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const iconCount = 9;
const iconHeight = 100;
const spinCost = 1;

const symbolRewards = {
  0: { name: "Seven", reward: 50 },
  1: { name: "Banana", reward: 25 },
  2: { name: "Watermelon", reward: 20 },
  3: { name: "Lemon", reward: 30 },
  4: { name: "Bar", reward: 30 },
  5: { name: "Bell", reward: 25 },
  6: { name: "Orange", reward: 22 },
  7: { name: "Plum", reward: 20 },
  8: { name: "Cherry", reward: 15 },
};

function App() {
  const [reels, setReels] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [credits, setCredits] = useState(10);
  const [wins, setWins] = useState(0);
  const [spins, setSpins] = useState(0);
  const [highlight, setHighlight] = useState([false, false, false]);
  const [highlightColor, setHighlightColor] = useState('');
  const [shake, setShake] = useState(false);
  const [showBigWinGifs, setShowBigWinGifs] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);
  const [biggestWin, setBiggestWin] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [responseDB, setResponse] = useState('');
  const [userName, setUserName] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [scoreTable, setScoreTable] = useState([]);
  const [winsSinceLastSave, setWinsSinceLastSave] = useState(0);
  const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer

  const winSound = useRef(null);
  const autoSpinRef = useRef(null);

  const getScores = async () => {
    try {
      const dbResponse = await fetch(`${ip}3010/getScore?minigame=SlotMachine,bigger`);
      const jsonResponse = await dbResponse.json();
      console.warn(jsonResponse);

      // Ensure the response is an array
      setScoreTable(Array.isArray(jsonResponse) ? jsonResponse : []);
    } catch (error) {
      console.error("Error fetching score:", error);
      setResponse("Error fetching score from database");
    }
  };

  useEffect(() => {
    getScores();
    const intervalId = setInterval(() => {
      getScores(); // Refresh scores every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.data.userName) {
        setUserName(event.data.userName);
        console.warn("User name is:", event.data.userName);
        window.removeEventListener("message", receiveMessage);
      }
    };
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [userName]);

  useEffect(() => {
    if (gameEnded && userName) {
      AddScore();
    }
  }, [gameEnded, userName]);

  const AddScore = async () => {
    try {
      console.warn(userName);
      const res = await fetch(`${ip}3010/addScoreSum?score=${userName},SlotMachine,${winsSinceLastSave}`);
      const responseText = await res.text();
      console.warn(responseText);
      setScoreTable(responseText);
    } catch (error) {
      console.error("Error saving score:", error);
      setResponse("Error saving score to database");
    }
  };

  useEffect(() => {
    winSound.current = new Audio(process.env.PUBLIC_URL + "/sounds/win.mp3");
  }, []);

  useEffect(() => {
    if (autoSpin && !isSpinning && credits >= spinCost) {
      autoSpinRef.current = setTimeout(spin, 2000);
    } else {
      clearTimeout(autoSpinRef.current);
    }
    return () => clearTimeout(autoSpinRef.current);
  }, [autoSpin, isSpinning, credits]);

  const getRandomIndex = () => Math.floor(Math.random() * iconCount);

  const spin = () => {
    if (isSpinning || credits < spinCost) return;
    setGameEnded(false);

    setIsSpinning(true);
    setMessage('');
    setCredits(prev => prev - spinCost);
    setHighlight([false, false, false]);
    setHighlightColor('');
    setShake(false);
    setSpins(prev => prev + 1);
    setShowBigWinGifs(false);

    const newReels = [getRandomIndex(), getRandomIndex(), getRandomIndex()];
    setReels(newReels);

    setTimeout(() => {
      const [r1, r2, r3] = newReels;
      let reward = 0;
      let newHighlight = [false, false, false];

      if (r1 === r2 && r2 === r3) {
        const symbol = symbolRewards[r1];
        reward = symbol.reward;
        winSound.current?.play();
        setMessage(`🎉 JACKPOT! 3x ${symbol.name} → +${reward} credits`);
        setWins(w => w + 1);
        setTotalWin(t => t + reward);
        if (reward > biggestWin) setBiggestWin(reward);
        newHighlight = [true, true, true];
        setHighlightColor('#FFD700');
        setShowBigWinGifs(true);
        confetti({ particleCount: 150, angle: 60, spread: 60, origin: { x: 0 } });
        confetti({ particleCount: 150, angle: 120, spread: 60, origin: { x: 1 } });
        setGameEnded(true);
        setWinsSinceLastSave(winsSinceLastSave + 1);
      } else if (r1 === r2 || r1 === r3 || r2 === r3) {
        reward = 2;
        setMessage('✨ You matched 2 symbols! +2 credits');
        setWins(w => w + 1);
        setTotalWin(t => t + reward);
        setGameEnded(true);
        setWinsSinceLastSave(winsSinceLastSave + 1);
        if (reward > biggestWin) setBiggestWin(reward);
        if (r1 === r2) newHighlight = [true, true, false];
        else if (r1 === r3) newHighlight = [true, false, true];
        else newHighlight = [false, true, true];
        setHighlightColor('#00eaff');
      } else {
        setMessage('😢 Try again for a BIG win!');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }

      setHighlight(newHighlight);
      setCredits(c => c + reward);
      setIsSpinning(false);
    }, 1000);
  };

  const addCredits = () => setCredits(c => c + 10);
  const toggleAutoSpin = () => setAutoSpin(prev => !prev);

  const getReelStyle = (index) => {
    const posY = reels[index] * iconHeight;
    return { backgroundPositionY: `-${posY}px` };
  };

  return (
    <div>
      <section id="scoreTable">
        <table>
          <thead>
            <tr><th>User</th><th>Total Credits Won</th></tr>
          </thead>
          <tbody>
            {Array.isArray(scoreTable) && scoreTable.slice(0, 5).map((entry, index) => (
              <tr key={index}>
                <td>{entry.userName}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className='app'>
        <h1>🎰 SLOT MACHINE 🎰</h1>

        {showBigWinGifs && (
          <div className="gif-container">
            {["gif1piw", "gif2wod", "gif3zeg", "gif4tan", "gif5mrg",
              "gif6jas", "gif7jas", "gif8jas", "boxdel"].map((name, i) => {
                const animations = ['floatUpDown', 'spin', 'pulse', 'bounce'];
                const anim = animations[Math.floor(Math.random() * animations.length)];
                return (
                  <img
                    key={i}
                    src={`/gifs/${name}.gif`}
                    alt="win"
                    className="big-win-gif"
                    style={{
                      top: `${Math.random() * 85}%`,
                      left: `${Math.random() * 90}%`,
                      animationName: anim,
                      animationDelay: `${Math.random() * 1.5}s`,
                    }}
                  />
                );
              })}
          </div>
        )}

        <div className="slots">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`reel-window ${highlight[i] ? 'highlight' : ''} ${shake ? 'shake-symbol' : ''}`}
              style={highlight[i] ? {
                borderColor: highlightColor,
                boxShadow: `0 0 20px 5px ${highlightColor}`
              } : {}}
            >
              <div className="reel" style={getReelStyle(i)}></div>
            </div>
          ))}
        </div>

        <div className="controls">
          <button onClick={spin} disabled={isSpinning || credits < spinCost}>
            {isSpinning ? 'Spinning...' : `Spin (-${spinCost})`}
          </button>
          <button onClick={addCredits} disabled={isSpinning}>Add Credits</button>
          <button
            onClick={toggleAutoSpin}
            className={autoSpin ? 'auto-spin-active' : ''}
          >
            {autoSpin ? 'Stop AutoSpin' : 'Start AutoSpin'}
          </button>
        </div>

        <div className="status">
          <p>Credits: <strong>{credits}</strong></p>
          <p>Spins: <strong>{spins}</strong></p>
        </div>

        <div className="status extra">
          <p>Total Wins: <strong>{wins}</strong></p>
          <p>Biggest Win: <strong>{biggestWin}</strong></p>
          <p>Total Credits Won: <strong>{totalWin}</strong></p>
        </div>

        <div id="message" style={{ backgroundColor: highlightColor || 'rgba(0,0,0,0.65)' }}>
          {message}
        </div>
      </div>
    </div>
  );
}

export default App;
