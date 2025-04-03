import React, { useState, useEffect } from "react";
import ButtonScore from "./ButtonScore";

const ScoreApp = () => {
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const receiveMessage = (event) => {
            if (event.origin !== "http://localhost:3000") return; // Zabezpieczenie
            if (event.data.userName) {
                setUserName(event.data.userName);
            }
        };

        window.addEventListener("message", receiveMessage);
        return () => window.removeEventListener("message", receiveMessage);
    }, []);
    return(
        <div>
            <ButtonScore />
            {userName}
        </div>
    )
};

export default ScoreApp;