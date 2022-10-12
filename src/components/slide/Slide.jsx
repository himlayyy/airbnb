import React from "react";
import "./slide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee, faPaperPlane, faSnowflake,faBriefcase, faTrain, faUmbrellaBeach, faSpa, faMountain } from "@fortawesome/free-solid-svg-icons";import { faGoogle } from '@fortawesome/free-brand-svg-icons';

import "./slide.css";
import {  
  faPaperPlane,
  faSnowflake,
  faBriefcase,
  faTrain,
  faUmbrellaBeach,
  faSpa,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Slide({ title, icon }) {
  const iconsList = [
    { snowflake: faSnowflake },
    { backpack: faBriefcase },
    // { "plane-up": faPaperPlane },
    // { "train-tram": faTrain },
    // { "umbrella-beach": faUmbrellaBeach },
    { spa: faSpa },
    { mountain: faMountain},
    { google: faGoogle}
  ];

  return (
    <div className="slideItem">
      
    </div>
  );
}

export default Slide;
