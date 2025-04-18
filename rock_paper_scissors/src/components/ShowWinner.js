import React from "react";

function ShowWinner({ winner = 0 }) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return <h2>{text[winner]}</h2>;
}

export default ShowWinner;
