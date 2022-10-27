import React, { useState, useEffect, useContext } from "react";


import { SearchContext } from "../../context/SearchContext";
import ExpandedSearch from "../expandedSearch/ExpandedSearch";
import { IoSearchCircleSharp } from "react-icons/io5";

import "./searchbar.css";

function SearchBar({ setSearchTab }) {
  const [active, setActive] = useState(null);
  const [onClick, setOnClick] = useState(false);
  const [openExpanded, setOpenExpanded] = useState(false);

  const {search} = useContext(SearchContext);
  const { country, datesString, guestsString} = search;

  const [searchQuery, setSearchQuery] = useState("");
  const [option, setOption] = useState("");

  useEffect(() =>{
    console.log("Context contents");
    console.log(search);
  },[])

  return (
    <>
      {openExpanded === true ? 
        (
          // <div>Expanded clicked! </div>
          <ExpandedSearch active={"btn1"} />
        ) 
        : 
        (
          <div className="search">
            <div className="searchSection">
              <div
                className="searchPrompt pointer"
                onClick={() => setOpenExpanded(!openExpanded)}
              >
                Where to?
              </div>
              { console.log(search)}
              <div className="searchItems">
                <button
                  className="staysGroup searchItem"
                  onClick={() => setSearchTab("btn1")}
                >
                  {country === null ? "Anywhere" : country}
                </button>
                <hr />
                <button
                  className="experiencesGroup searchItem"
                  onClick={() => setSearchTab("btn2")}
                >
                  {/* {datesString.start && datesString.end === undefined ? "Any week" : `${datesString.start} - ${datesString.end}`} */}
                  {/* {datesString === null ? "Any week" : `${datesString.start} - ${datesString.end}`} */}
                  {datesString === null ? "Any week" : "Dili null"}
                </button>
                <hr />
                <button
                  className="onlineExperiences searchItem"
                  onClick={() => setSearchTab("btn3")}
                >
                  {guestsString === null ? "Add guests" : guestsString}
                  
                </button>
              </div>
            </div>
            <button className="searchButton searchItem">
              <IoSearchCircleSharp size={"3em"} />
            </button>
          </div>
        )
      }
    </>
  );
}

export default SearchBar;
