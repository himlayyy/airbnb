import React from "react";
import "./stayfilter.css";

import {CgOptions} from "react-icons/cg";

function StayFilter(){
    return(
        <div className="filter">
            <button className="filterButton">
                <CgOptions className="filterIcon"/>
                
                Filter
            </button>
        </div>
    )
};

export default StayFilter;