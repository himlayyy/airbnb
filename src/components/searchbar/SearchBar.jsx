import React, { useState } from "react";

import ExpandedSearch from "../expandedSearch/ExpandedSearch";

import "./searchbar.css";

import { IoSearchCircleSharp } from "react-icons/io5";

function SearchBar({ setSearchTab }) {
  const [active, setActive] = useState(null);
  const [onClick, setOnClick] = useState(false);
  const [openExpanded, setOpenExpanded] = useState(false)

  const [searchQuery, setSearchQuery] = useState("");
  const [option, setOption] = useState("");

  return (
    <>
    {openExpanded === true ? (<ExpandedSearch activ={"btn1"} />)
    : 
      (
        <div className="search">
          <div className="searchSection">
            <div className="searchPrompt pointer" 
            onClick={() => setOpenExpanded(!openExpanded)}>Where to?</div>
            <div className="searchItems">
              <button
                className="staysGroup searchItem"
                onClick={() => setSearchTab("btn1")}
              >
                Anywhere
              </button>
              <hr />
              <button
                className="experiencesGroup searchItem"
                onClick={() => setSearchTab("btn2")}
              >
                Any week
              </button>
              <hr />

              <button
                className="onlineExperiences searchItem"
                onClick={() => setSearchTab("btn3")}
              >
                Add guests
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
