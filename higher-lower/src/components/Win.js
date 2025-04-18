import React from 'react';

function Win(props) {
  return (
    <div className="win">
      <div>{props.message}</div>
      <div>Score: {props.score}</div>
    </div>
  );
}

export default Win;
// Compare this snippet from src/components/Game.js: