import React, { useState, useEffect, useRef } from "react";
import ClickButton from "./ClickButton";


const ClickerApp = () => {
    const [numberClicks, setClick] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [milliseconds, setMiliseconds] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const button = useRef();
    const timesClicked = useRef();
    const timer = useRef();
    const image = useRef();

    const Click = () => {
        setClick(numberClicks + 1);
        button.current.style.animation = "none";
        button.current.style.background = "none";
        const pixels = 48.0 + (numberClicks);
        timesClicked.current.style.fontSize = `${pixels}px`;
        button.current.style.backgroundColor = `rgb(255,${255-numberClicks*3},${255-numberClicks*3})`;
        if (!isTimerStarted){
            setIsTimerStarted(true);
        }
    }
    useEffect(() =>{
        if (!isTimerStarted) return;
            if (seconds === 0 && milliseconds === 0) {
                button.current.style.display = "none";
                timer.current.style.display = "none";
                image.current.style.display = "block";
            }
            const timerId = setInterval(() => {
                setMiliseconds(prevMilliseconds => {
                    if (prevMilliseconds > 0){
                        return prevMilliseconds - 10;
                    }else if (seconds > 0){
                        setSeconds(prevSeconds => prevSeconds -0.5);
                        return 990;
                    }
                    return 0;
                })
            }, 10);                    
            return () => clearInterval(timerId);
    }, [isTimerStarted, seconds, milliseconds]);
    return (
        <div id="main-div">
            <ClickButton clicked={Click} button={button}/>
            <div class="text" >Times clicked: <span ref={timesClicked}>{numberClicks}</span></div>
            <img src="clicker.gif" ref={image} id="endGif"></img>
            <div class="text" ref={timer}>
                Timer: {seconds} s {milliseconds} ms
            </div>
        </div>
    )
}

export default ClickerApp;