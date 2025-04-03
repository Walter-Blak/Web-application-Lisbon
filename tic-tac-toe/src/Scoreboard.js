// Scoreboard.js
import React from "react";

function Scoreboard({ xWins, oWins, draws }) {
  return (
    <div className="scoreboard">
      <div>
        <strong>X Wins:</strong> {xWins}
      </div>
      <div>
        <strong>Draws:</strong> {draws}
      </div>
      <div className="o-wins">
        <strong>O Wins:</strong> {oWins}
      </div>
    </div>
  );
}

export default Scoreboard;
