import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginApp = () =>{
    const [addUserResponse, setResponseAddUser] = useState(0);
    const login = async() =>{
        let userName = document.getElementById("userName").value;
        const addUser = await fetch(`http://localhost:3001/addUser?userName=Jack1`);
        //const response = await addUser.text();
        //setResponseAddUser(response)
    }
    return (
        <div>
            <LoginForm login={login} />
            {addUserResponse}
            asdf
        </div>
    )
};

export default LoginApp;