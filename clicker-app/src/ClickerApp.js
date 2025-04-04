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
    const button = useRef();
    const timesClicked = useRef();
    const mainDiv = useRef();
    const timer = useRef();
    const image = useRef();
    const autoClicker = useRef();
    const ip = "http://192.168.68.73:";

    useEffect(() => {
        console.warn("useEffect with get userName");
        const receiveMessage = (event) => {
            
    
            if (event.data.userName) {
                console.warn("Otrzymano nazwę użytkownika:", event.data.userName);
                setUserName(event.data.userName);
            }
        };
    
        window.addEventListener("message", receiveMessage);
        return () => window.removeEventListener("message", receiveMessage);
    }, []);

    useEffect(() => {
        if(gameEnded && userName){
            console.warn("useEffect where AddScore if starts");
            AddScore(numberClicks);
        }
    }, [gameEnded, userName]);
    

    const AddScore = async (numberClicks) => {
        try {
            console.warn(userName);
            const res = await fetch(`${ip}3001/addScore?score=${userName},Clicker,${numberClicks}`);
            const responseText = await res.text();
            setResponse(responseText);
        } catch (error) {
            console.error("Błąd zapisu wyniku:", error);
            setResponse("Błąd zapisu do bazy");
        }
    };

    const Click = () => {
        setClick(prev => prev + 1);
        button.current.style.animation = "none";
        button.current.style.background = "none";
        const pixels = 48.0 + numberClicks;
        timesClicked.current.style.fontSize = `${pixels}px`;
        if (numberClicks > 300){
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
    }, [isTimerStarted, seconds, milliseconds]);

    return (
        <div id="main-div" ref={mainDiv}>
                <ClickButton clicked={Click} button={button} />
                <div className="text">Times clicked: <span ref={timesClicked}>{numberClicks}</span></div>
                <img src="clicker.gif" ref={image} id="endGif" />
                <div className="text" ref={timer}>
                    Timer: {seconds} s {milliseconds} ms
                </div>
                {responseDB}
        </div>
    );
};

export default ClickerApp;
