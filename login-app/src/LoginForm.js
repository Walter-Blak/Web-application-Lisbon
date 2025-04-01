import React from 'react';

const LoginForm = ({login}) => {
    return (
        <div>
            <form action="#" method="post">
                Enter user name: <input type="text" id="userName"></input><br></br>
                <input type="button" value="Login" onClick={() => login() }></input>
            </form>
        </div>
    )
};

export default LoginForm;