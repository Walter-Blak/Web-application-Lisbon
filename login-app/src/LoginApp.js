import React, { useState, useRef} from 'react';
import LoginForm from './LoginForm';

const LoginApp = () =>{

    const userNameRef = useRef();
    const gamesPage = useRef();
    const formPage = useRef();
    const imgGoodChoice = useRef();
    const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer

    const login = async() =>{
        const userName = userNameRef.current.value;
        if (userName.trim().length === 0){
            alert("WOW, you are really creative with your nickname 😂.");
        }else {
            const addUser = await fetch(`${ip}3010/addUser?userName=${userName}`);
            const response = await addUser.text();
            if (response === "1"){
                formPage.current.style.display = "none";
                gamesPage.current.style.display = "block";
            }else if (response === "0"){
                const continiueAsThisUser = window.confirm(`This user name is already exists. Do you want continiue as ${userName}`);
                if (continiueAsThisUser){
                    formPage.current.style.display = "none";
                    gamesPage.current.style.display = "block";
                }
            }
        }
    };
    const openGame = async(port) => {
        const userName = userNameRef.current.value;
        gamesPage.current.style.display = "none";
        imgGoodChoice.current.style.display = "block";
       
        setTimeout(() => {
            const newWindow = window.open(`${ip}${port}`, "_blank");
            const message = { userName };
    
            // 3. Spróbuj wysłać wiadomość kilkukrotnie (na wypadek, gdyby ClickerApp jeszcze się ładował)
            let attempts = 0;
            const interval = setInterval(() => {
                if (attempts > 10) clearInterval(interval); // max 5 sekund
                if (newWindow) {
                    newWindow.postMessage(message, `${ip}${port}`);
                    attempts++;
                }
            }, 500);
        }, 1700); 
        setTimeout(() => {
            imgGoodChoice.current.style.display = "none";
            gamesPage.current.style.display = "block";
        }, 1700);
    }
    return (
        <div id="main-div">
            <img src="../good_choice.gif" id="imgGoodChoice" ref={imgGoodChoice}></img>
            <LoginForm login={login} openGame={openGame} userNameRef={userNameRef} GamesPage={gamesPage} FormPage={formPage}/>
   
        </div>
    )
};

export default LoginApp;