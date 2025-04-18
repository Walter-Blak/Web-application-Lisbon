import React, { useState, useRef} from 'react';
import { Link,useNavigate } from 'react-router';

const MainApp_loginPage = () =>{
    const [userName, setUserName] = useState('');
    const userNameRef = useRef();
    const gamesPage = useRef();
    const formPage = useRef();
    const imgGoodChoice = useRef();
    const ip = "http://192.168.100.8:"; // here you need to enter corect ip address of this computer

    const login = async() =>{
        const userNameget = userNameRef.current.value;
        if (userNameget.trim().length === 0){
            alert("WOW, you are really creative with your nickname 😂.");
        }else {
            const addUser = await fetch(`${ip}3010/addUser?userName=${userNameget}`);
            const response = await addUser.text();
            if (response === "1"){
                sendUserName()
                window.location.href = '#/gamesPage';
            }else if (response === "0"){
                const continiueAsThisUser = window.confirm(`This user name is already exists. Do you want continiue as ${userNameget}`);
                if (continiueAsThisUser){
                    sendUserName()
                    window.location.href = '#/gamesPage';
                }
            }
        }
    };
    const navigate = useNavigate();
    function sendUserName(){
        navigate(`/gamesPage`, {state: {username: userName}});
    }
    
    return (
        <div id="main-div">
            <img src="../good_choice.gif" id="imgGoodChoice" ref={imgGoodChoice}></img>
            <form action="#" method="post" id="loginForm" ref={formPage}>
                <h1 id="EnterName">Enter user name</h1>
                <input type="text" id="userName" ref={userNameRef} onChange={(e) => setUserName(e.target.value)}></input><br></br>
                <input type="button" value="Login" id="buttonLogin" onClick={() => login() }></input><br></br>
            </form>
   
        </div>
    )
};

export default MainApp_loginPage;