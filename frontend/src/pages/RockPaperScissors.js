import "../css/rockPaperScissors.css";
import { useState, useEffect } from "react";
import Player from "../components/RockPaperScissors/Player";
import ActionButton from "../components/RockPaperScissors/ActionButton";
import ShowWinner from "../components/RockPaperScissors/ShowWinner";

//copy to each page 
import { useLocation, useNavigate } from 'react-router';
import ScoreTable from '../components/ScoreTable';
import AddScoreSum from '../components/AddScoreSum';
import GetScore from '../components/GetScore';
import ButtonReturn from '../components/ButtonReturn';

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

function RockPaperScissors() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [scoreTable, setScoreTable] = useState([]);
  const [winsSinceLastSave, setWinsSinceLastSave] = useState(0);
  const {state} = useLocation();
  const userName = state;
  const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer

    useEffect(() => {
              if(gameEnded && userName){
                  console.warn("useEffect where AddScore if starts", userName.username);
                  AddScoreSum({ score: '1', userName: userName.username, game: "RockPaperScissors" });
              }
      }, [gameEnded, userName]);
    
    useEffect(() => {
        const fetchScoreTable = async () => {
          const scoreData = await GetScore({ miniGame: "RockPaperScissors", SM: "bigger" });
          console.warn(scoreData);
          setScoreTable(scoreData);
        };
      
        fetchScoreTable(); // pierwsze pobranie
      
        const intervalId = setInterval(() => {
          fetchScoreTable(); // odświeżanie co 5s
        }, 1000);
      
        return () => clearInterval(intervalId);
    }, []);
    const navigate = useNavigate();
    const sendUserNameToGamesPage = () => {
      navigate(`/gamesPage`, {state: {username: userName.username}});
    }             

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
      <ScoreTable scoreTable={scoreTable}/>
      <span onClick={() => sendUserNameToGamesPage()}>
        <ButtonReturn />
      </span>
      <div id="RockPaperScissors">
        <div className="center">
          <h1 class="h1_Rock">Rock Paper Scissors</h1>
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
    </div>
  );
}

export default RockPaperScissors;
