import React, { useState, useEffect, useRef } from "react";
import ClickButton from "./ClickButton";

const ClickerApp = () => {
    const [numberClicks, setClick] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [milliseconds, setMiliseconds] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [responseDB, setResponse] = useState('');
    const [userName, setUserName] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    const [scoreTabe, setScoreTable] = useState([]);
    const button = useRef();
    const timesClicked = useRef();
    const mainDiv = useRef();
    const timer = useRef();
    const image = useRef();
    const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer

    // get user name from login page
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
    }, [gameEnded, userName, numberClicks]);  
    
          
      
    const AddScore = async () => {
              try {
                  console.warn(userName);
                  let strNumberClick = numberClicks.toString();
                  const res = await fetch(`${ip}3010/addScore?score=${userName},Clicker,${strNumberClick},bigger`);            
                  const responseText = await res.text();
                  console.warn(responseText);
                  setScoreTable(responseText);
              } catch (error) {
                  console.error("Błąd zapisu wyniku:", error);
                  setResponse("Błąd zapisu do bazy");
              }
      };

    

    useEffect(() => {
        if (gameEnded && userName) {
            AddScore(numberClicks);
        }
    }, [gameEnded, userName, numberClicks]);


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

    const getScores = async () => {
        try {
          const dbResponse = await fetch(`${ip}3010/getScore?minigame=Clicker,bigger`);
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

export default ClickerApp;
