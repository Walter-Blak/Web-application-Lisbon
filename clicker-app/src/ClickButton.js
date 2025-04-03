import React from "react";

const ClickButton = ({clicked, button}) => {
    return (
        <button onClick={() => clicked()} ref={button} id="clickerButton">Click me</button>
    )
}

export default ClickButton;