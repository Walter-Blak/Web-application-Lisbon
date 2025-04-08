import React from 'react';

function Button(props) {
  return (
    <div className="col">
      <button
        disabled={props.isDisabled}
        className={`btn ${props.color}`}
        onClick={() => props.action()}
      >
        {props.name}
      </button>
    </div>
  );
}

export default Button;
