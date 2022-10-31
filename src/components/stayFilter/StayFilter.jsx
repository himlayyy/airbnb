import React from "react";
import "./stayfilter.css";

import {CgOptions} from "react-icons/cg";

function StayFilter({width="1.5 em"}){
    return(
        <div className="filter">
            <button className="filterButton">
                <CgOptions className="filterIcon" width={width}/>
                
                <span>Filter</span>
            </button>
        </div>
    )
};

export default StayFilter;