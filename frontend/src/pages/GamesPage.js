import React, { useState } from 'react';
import {Link, useNavigate, useLocation} from 'react-router';
import ButtonReturnLogin from '../components/ButtonReturnLogin';

const GamesPage = () => {
    const {state} = useLocation();
    const userName = state;
    console.warn(state);
    const navigate = useNavigate();
    function sendUserName(gameName){
        navigate(`/${gameName}`, {state: {username: userName.username}});
    }

    return (
        <div id="main-div">
            <ButtonReturnLogin />
            <section id="GamesPage" >
                <div id="Games">
                    <div class="divGames" onClick={() => sendUserName("memoryGame")}>
                        <img src='../memoryGame.ico' class="imgGames"></img>
                        <Link to='/memoryGame' class="gameName links" >Memory Game</Link>
                    </div>
                    <div class="divGames" onClick={() => sendUserName("clicker")}>
                        <img src="../gaming.png" class="imgGames"></img>
                        <Link to='/clicker' class="gameName links" >Clicker</Link>
                    </div>
                    <div class="divGames" onClick={() => sendUserName("rockpaperscissors")}>
                        <img src="../rock-paper-scissors.png" class="imgGames"></img>
                        <Link to='/rockpaperscissors' class="gameName links">Rock Paper Scissors</Link>
                    </div>
                    <div class="divGames" onClick={() => sendUserName("slotmachine")}>
                        <img src="../jackpot-machine.png" class="imgGames"></img>
                        <Link to='/slotmachine' class="gameName links">Slot Machine</Link>
                    </div>
                    <div class="divGames" onClick={() => sendUserName("tictactoe")}>
                        <img src="../tic-tac-toe.png" class="imgGames"></img>
                        <Link to='/tictactoe' class="gameName links">Tic Tac Toe</Link>
                    </div>
                    <div class="divGames" onClick={() => sendUserName("higherlower")}>
                        <img src="../hight-lower.ico" class="imgGames"></img>
                        <Link to='/higherlower' class="gameName links" >Higher Lower</Link>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default GamesPage;