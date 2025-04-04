import React from 'react';

const LoginForm = ({login, openMemoryGame, userNameRef, GamesPage, FormPage, openClicker}) => {
    return (
        <div>
            <form action="#" method="post" id="loginForm" ref={FormPage}>
                <h1 id="EnterName">Enter user name</h1>
                <input type="text" id="userName" ref={userNameRef}></input><br></br>
                <input type="button" value="Login" id="buttonLogin" onClick={() => login() }></input><br></br>
            </form>
            <section id="GamesPage" ref={GamesPage}>
                <div id="Games">
                    <div class="divGames" onClick={() => openMemoryGame()}>
                        <img src='memoryGame.ico' class="imgGames"></img>
                        <span class="gameName">Memory Game</span>
                    </div>
                    <div class="divGames" onClick={() => openClicker()}>
                        <img src="gaming.png" class="imgGames"></img>
                        <span class="gameName">Clicker</span>
                    </div>
                    <div class="divGames">
                        <img src="black-jack.png" class="imgGames"></img>
                        <span class="gameName">Black Jack</span>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default LoginForm;