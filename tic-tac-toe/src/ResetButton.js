// ResetButton.js
import React from "react";

function ResetButton({ onReset }) {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset Game
    </button>
  );
}

export default ResetButton;
