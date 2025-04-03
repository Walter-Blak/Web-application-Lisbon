import { useState } from "react";

function Square({ value, squareClick }) {
  /*const [value, setValue] = useState(null);*/
  /*
  function Click() {
    setValue("X");
  }
*/
  return (
    <button className="cell" onClick={squareClick}>
      {value}
    </button>
  );
}
export default Square;
