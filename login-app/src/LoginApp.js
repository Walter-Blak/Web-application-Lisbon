import React, { useState, useRef} from 'react';
import LoginForm from './LoginForm';

const LoginApp = () =>{
    const [addUserResponse, setResponseAddUser] = useState('');
    const userNameRef = useRef();
    const gamesPage = useRef();
    const formPage = useRef();
    const imgGoodChoice = useRef();
    const login = async() =>{
        const userName = userNameRef.current.value;
        const addUser = await fetch(`http://192.168.68.73:3001/addUser?userName=${userName}`);
        const response = await addUser.text();
        if (response == "1"){
            formPage.current.style.display = "none";
            gamesPage.current.style.display = "block";
        }else if (response == "0"){
            alert("This user name is already exists");
        }
    };
    const openMemoryGame = async() => {
        const userName = userNameRef.current.value;
        gamesPage.current.style.display = "none";
        imgGoodChoice.current.style.display = "block";
        setTimeout(() => {
            const newWindow = window.open("http://192.168.68.84:3000", "_blank");
            newWindow.postMessage({ userName }, "http://localhost:3002");
        }, 1700);
    }
    return (
        <div id="main-div">
            <img src="../good_choice.gif" id="imgGoodChoice" ref={imgGoodChoice}></img>
            <LoginForm login={login} openMemoryGame={openMemoryGame} userNameRef={userNameRef} GamesPage={gamesPage} FormPage={formPage}/>
            {addUserResponse}
        </div>
    )
};

export default LoginApp;