import React from 'react';

const LoginForm = ({login, openGame, userNameRef, GamesPage, FormPage}) => {
    return (
        <div>
            <form action="#" method="post" id="loginForm" ref={FormPage}>
                <h1 id="EnterName">Enter user name</h1>
                <input type="text" id="userName" ref={userNameRef}></input><br></br>
                <input type="button" value="Login" id="buttonLogin" onClick={() => login() }></input><br></br>
            </form>
            {/* Here you have to change all ports, which the react apps with minigames work */}
            <section id="GamesPage" ref={GamesPage}>
                <div id="Games">
                    <div class="divGames" onClick={() => openGame(3001)}>
                        <img src='memoryGame.ico' class="imgGames"></img>
                        <span class="gameName">Memory Game</span>
                    </div>
                    <div class="divGames" onClick={() => openGame(3000)}>
                        <img src="gaming.png" class="imgGames"></img>
                        <span class="gameName">Clicker</span>
                    </div>
                    <div class="divGames" onClick={() => openGame(3004)}>
                        <img src="rock-paper-scissors.png" class="imgGames"></img>
                        <span class="gameName">Rock Paper Scissors</span>
                    </div>
                    <div class="divGames" onClick={() => openGame(3005)}>
                        <img src="jackpot-machine.png" class="imgGames"></img>
                        <span class="gameName">Slot Machine</span>
                    </div>
                    <div class="divGames" onClick={() => openGame(3006)}>
                        <img src="tic-tac-toe.png" class="imgGames"></img>
                        <span class="gameName">Tic Tac Toe</span>
                    </div>
                    <div class="divGames" onClick={() => openGame(3002)}>
                        <img src="hight-lower.ico" class="imgGames"></img>
                        <span class="gameName">Higher Lower</span>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default LoginForm;