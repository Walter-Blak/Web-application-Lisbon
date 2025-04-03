import { useState } from "react";
import Square from "./Square.js";
import Winner from "./Winner.js";
import ResetButton from "./ResetButton.js";
import Scoreboard from "./Scoreboard.js";

function Board() {
  const [xIsNext, SetXIsNext] = useState(true); // Sets X as the first player
  const [squares, setSquares] = useState(Array(9).fill(null)); // Initializes squares with null values
  const [xWins, setXWins] = useState(0); // Tracks X player's win count
  const [oWins, setOWins] = useState(0); // Tracks O player's win count
  const [gameOver, setGameOver] = useState(false); // Tracks if the game is over
  const [draw, setDraw] = useState(false); // Tracks if the game ended in a draw
  const [draws, setDraws] = useState(0); // Tracks the number of draws

  // Function to handle a square click
  function Click(i) {
    // If the square is already filled or the game is over, do nothing
    if (squares[i] || gameOver) {
      return;
    }

    // Create a copy of the squares array
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X"; // Set "X" for the current player
    } else {
      nextSquare[i] = "O"; // Set "O" for the current player
    }

    setSquares(nextSquare);
    SetXIsNext(!xIsNext); // Switch turn to the other player

    // Check if the game is over after each move
    const whoWin = Winner(nextSquare);
    if (whoWin) {
      setGameOver(true); // Game is over
      if (whoWin === "X") {
        setXWins((prev) => prev + 1); // Increment X's win count
      } else {
        setOWins((prev) => prev + 1); // Increment O's win count
      }
    } else if (!nextSquare.includes(null)) {
      // If no empty squares, it's a draw
      setGameOver(true);
      setDraw(true); // Set the draw state
      setDraws((prev) => prev + 1); // Increment the draws count
    }
  }

  // Function to reset the game
  function handleReset() {
    setSquares(Array(9).fill(null)); // Reset all squares to null
    SetXIsNext(true); // Set X to start the next game
    setGameOver(false); // Reset game over state
    setDraw(false); // Reset draw state
  }

  const whoWin = Winner(squares); // Determine the winner based on current squares
  let Status;
  if (whoWin) {
    Status = "Winner: " + whoWin; // Display the winner
  } else if (draw) {
    Status = "It's a draw!"; // Display draw message
  } else {
    Status = "Next move: " + (xIsNext ? "X" : "O"); // Display the next player's turn
  }

  return (
    <>
      <Scoreboard xWins={xWins} oWins={oWins} draws={draws} />{" "}
      {/* Passing draws to Scoreboard */}
      <div className="status">{Status}</div>
      {/* First row */}
      <div className="row">
        <Square value={squares[0]} squareClick={() => Click(0)} />
        <Square value={squares[1]} squareClick={() => Click(1)} />
        <Square value={squares[2]} squareClick={() => Click(2)} />
      </div>
      {/* Second row */}
      <div className="row">
        <Square value={squares[3]} squareClick={() => Click(3)} />
        <Square value={squares[4]} squareClick={() => Click(4)} />
        <Square value={squares[5]} squareClick={() => Click(5)} />
      </div>
      {/* Third row */}
      <div className="row">
        <Square value={squares[6]} squareClick={() => Click(6)} />
        <Square value={squares[7]} squareClick={() => Click(7)} />
        <Square value={squares[8]} squareClick={() => Click(8)} />
      </div>
      <ResetButton onReset={handleReset} />
    </>
  );
}

export default Board;
