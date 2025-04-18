import "../css/buttonReturnLogin.css";
import { Link } from "react-router";
function ButtonReturnLogin (){
    return (
        <Link to="/" id="button_return_login" class="links">Return to Login Page</Link>
    )
}

export default ButtonReturnLogin;