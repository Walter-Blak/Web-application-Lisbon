import { useEffect } from "react";
import "../css/buttonReturn.css";
import { Link} from "react-router";
function ButtonReturn (userName){

    return (
        <Link to="/gamesPage" id="button_return" class="links">Return to Games Page</Link>
    )
}

export default ButtonReturn;