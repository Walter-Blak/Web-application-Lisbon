import React from 'react';

function NumbersComponent(props) {
  return (
    <div className="numbers">
      {props.numbers.map((n, i) => (
        <span className="number-tile" key={i}>{n}</span>
      ))}
    </div>
  );
}

export default NumbersComponent;
