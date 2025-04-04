import React, { useState, useRef} from 'react';
import LoginForm from './LoginForm';

const LoginApp = () =>{
    const [addUserResponse, setResponseAddUser] = useState('');
    const userNameRef = useRef();
    const gamesPage = useRef();
    const formPage = useRef();
    const imgGoodChoice = useRef();
    const ip = "http://192.168.68.73:";
    const login = async() =>{
        const userName = userNameRef.current.value;
        const addUser = await fetch(`${ip}3001/addUser?userName=${userName}`);
        const response = await addUser.text();
        if (response == "1"){
            formPage.current.style.display = "none";
            gamesPage.current.style.display = "block";
        }else if (response == "0"){
            const continiueAsThisUser = window.confirm(`This user name is already exists. Do you want continiue as ${userName}`);
            if (continiueAsThisUser){
                formPage.current.style.display = "none";
                gamesPage.current.style.display = "block";
            }
        }
    };
    const openMemoryGame = async() => {
        const userName = userNameRef.current.value;
        gamesPage.current.style.display = "none";
        imgGoodChoice.current.style.display = "block";
        setTimeout(() => {
            const newWindow = window.open(`${ip}3003`, "_blank");
            const message = { userName };
    
            // 3. Spróbuj wysłać wiadomość kilkukrotnie (na wypadek, gdyby ClickerApp jeszcze się ładował)
            let attempts = 0;
            const interval = setInterval(() => {
                if (attempts > 10) clearInterval(interval); // max 5 sekund
                if (newWindow) {
                    newWindow.postMessage(message, `${ip}3003`);
                    attempts++;
                }
            }, 500);
        }, 1700); // 2000 ms = 2 sekundy
    }
    const openClicker = async() => {
        const userName = userNameRef.current.value;
        gamesPage.current.style.display = "none";
        imgGoodChoice.current.style.display = "block";
        setTimeout(() => {
            const newWindow = window.open(`${ip}3000`, "_blank");
            const message = { userName };
    
            // 3. Spróbuj wysłać wiadomość kilkukrotnie (na wypadek, gdyby ClickerApp jeszcze się ładował)
            let attempts = 0;
            const interval = setInterval(() => {
                if (attempts > 10) clearInterval(interval); // max 5 sekund
                if (newWindow) {
                    newWindow.postMessage(message, `${ip}3000`);
                    attempts++;
                }
            }, 500);
        }, 1700); // 2000 ms = 2 sekundy
    }
    return (
        <div id="main-div">
            <img src="../good_choice.gif" id="imgGoodChoice" ref={imgGoodChoice}></img>
            <LoginForm login={login} openMemoryGame={openMemoryGame} userNameRef={userNameRef} GamesPage={gamesPage} FormPage={formPage} openClicker={openClicker}/>
            {addUserResponse}
        </div>
    )
};

export default LoginApp;