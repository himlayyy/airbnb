import React from "react";
import "./sitelogo.css";
import {FaAirbnb} from "react-icons/fa";
import AirbnbLetterLogo from "./AirbnbLetterLogo"

function SiteLogo(){
    return(
        <div className="siteLogo pointer">
            <FaAirbnb color={"var(--airbnb-color"} size={"2em"} />
            <AirbnbLetterLogo color={"var(--airbnb-color"} size={"5em"}/>
        </div>
    )
}

export default SiteLogo;