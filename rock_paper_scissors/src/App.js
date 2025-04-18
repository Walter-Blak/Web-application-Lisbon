import "./styles.css";
import { useState, useEffect } from "react";
import Player from "./components/Player";
import ActionButton from "./components/ActionButton";
import ShowWinner from "./components/ShowWinner";

const actions = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }
  return null;
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);
  const [responseDB, setResponse] = useState('');
  const [userName, setUserName] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [scoreTabe, setScoreTable] = useState([]);
  const [winsSinceLastSave, setWinsSinceLastSave] = useState(0);
  const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer


  const getScores = async () => {
            try {
              const dbResponse = await fetch(`${ip}3010/getScore?minigame=RockPaperScissors,bigger`);
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
                    console.warn("User name is: ", userName);
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
 
            const res = await fetch(`${ip}3010/addScoreSum?score=${userName},RockPaperScissors,0.5`);
            const responseText = await res.text();
            console.warn(responseText);

            setWinsSinceLastSave(0); 
            setScoreTable(responseText);
          } catch (error) {
            console.error("Błąd zapisu wyniku:", error);
            setResponse("Błąd zapisu do bazy");
          }
        };
    
        
    
  useEffect(() => {
            if (gameEnded && userName) {
                AddScore();
            }
        }, [gameEnded, userName]);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();
    setGameEnded(false);

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
      setWinsSinceLastSave(winsSinceLastSave + 1); // Zwiększ licznik wygranych od ostatniego zapisu
      setGameEnded(true);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div>
      <section id="scoreTable">
                <table>
                    <thead>
                        <tr>Total wins by other users</tr>
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
      <div className="center">
        <h1>Rock Paper Scissors</h1>
        <div>
          <div className="container">
            <Player name="Player" score={playerScore} action={playerAction} />
            <Player name="Computer" score={computerScore} action={computerAction} />
          </div>
          <div>
            <ActionButton action="rock" onActionSelected={onActionSelected} />
            <ActionButton action="paper" onActionSelected={onActionSelected} />
            <ActionButton action="scissors" onActionSelected={onActionSelected} />
          </div>
          <ShowWinner winner={winner} />
        </div>
      </div>
    </div>
  );
}

export default App;
