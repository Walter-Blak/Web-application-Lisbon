import React, { useState, useEffect, useRef } from "react";
import ClickButton from "../components/clicker/ClickButton";
import '../css/clicker.css';

// copy this code to each minigame
import ScoreTable from "../components/ScoreTable";
import { useLocation, useNavigate } from 'react-router';
import AddScore from '../components/AddScore';
import GetScore from "../components/GetScore";
import ButtonReturn from "../components/ButtonReturn";

const Clicker = () => {
    const [numberClicks, setClick] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [milliseconds, setMiliseconds] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [responseDB, setResponse] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    const [scoreTable, setScoreTable] = useState([]);
    const button = useRef();
    const timesClicked = useRef();
    const mainDiv = useRef();
    const timer = useRef();
    const image = useRef();
    const {state} = useLocation();
    const userName = state;
    const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer
      
    // copy this code to each game until this
    useEffect(() => {
        if (gameEnded && userName) {
            AddScore({ score: numberClicks, userName: userName.username, game: "Clicker", SM: "bigger" });
        }
    }, [gameEnded, userName, numberClicks]);  
    
    useEffect(() => {
        const fetchScoreTable = async () => {
          const scoreData = await GetScore({ miniGame: "Clicker", SM: "bigger" });
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
    
    const Click = () => {
        setClick(prev => prev + 1);
        button.current.style.animation = "none";
        button.current.style.background = "none";
        const pixels = 48.0 + numberClicks;
        timesClicked.current.style.fontSize = `${pixels}px`;
        if (numberClicks > 300) {
            mainDiv.current.innerHTML = `
                <h1 id="autoClickerh1">Nie urzywaj k***a auto clickera</h1>
                <img src="cheater.gif" />
            `
        }
        button.current.style.backgroundColor = `rgb(255,${255 - numberClicks * 3},${255 - numberClicks * 3})`;
        if (!isTimerStarted) {
            setIsTimerStarted(true);
        }
    };

    useEffect(() => {
        if (!isTimerStarted) return;

        if (seconds === 0 && milliseconds === 0) {
            button.current.style.display = "none";
            timer.current.style.display = "none";
            image.current.style.display = "block";
            setGameEnded(true);
        }

        const timerId = setInterval(() => {
            setMiliseconds(prevMilliseconds => {
                if (prevMilliseconds > 0) {
                    return prevMilliseconds - 10;
                } else if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 0.5);
                    return 990;
                }
                return 0;
            });
        }, 10);

        return () => clearInterval(timerId);
    }, [isTimerStarted, seconds, milliseconds, numberClicks]);
    
      

    return (
        <div class='ClickerApp'>
            <ScoreTable scoreTable={scoreTable} />
            <span onClick={() => sendUserNameToGamesPage()}>
                <ButtonReturn />
            </span>
            <div id="main-div" ref={mainDiv}>
                <ClickButton clicked={Click} button={button} />
                <div className="text">
                    Times clicked: <span ref={timesClicked}>{numberClicks}</span>
                </div>
                <img src="clicker.gif" ref={image} id="endGif" />
                <div className="text" ref={timer}>
                    Timer: {seconds} s {milliseconds} ms
                </div>
                {responseDB}
            </div>
        </div>
    );
};

export default Clicker;
