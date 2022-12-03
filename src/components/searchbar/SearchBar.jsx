import React, { useState, useEffect, useContext } from "react";

import { SearchContext } from "../../context/SearchContext";

import ExpandedSearch from "../expandedSearch/ExpandedSearch";
import StayFilter from "../stayFilter/StayFilter";

import { IoSearchCircleSharp } from "react-icons/io5";

import "./searchbar.css";

function SearchBar({setSearchTab}) {
  const {search} = useContext(SearchContext);
  const { country, datesString, guestsString} = search;

  return (
    <>     
          <div className="search">
            <StayFilter width="1.5 em"/>
            <div className="searchSection">
              <div
                className="searchPrompt pointer"
                onClick={() => {
                  setSearchTab("btn1")}}              
              >
                Where to?
              </div>
              <div className="searchItems">
                <button
                  className="staysGroup searchItem"
                  onClick={() => { 
                    setSearchTab("btn1");
                  }}
                >
                  {country === null ? "Anywhere" : country}
                </button>
                <hr />
                <button
                  className="experiencesGroup searchItem"
                  onClick={() => setSearchTab("btn2")}
                >
                  {datesString === null ? "Any week" : `${datesString?.start} - ${datesString?.end}`}
                  {console.log("Dates String")}
                  {console.log(datesString)}
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
    </>
  );
}

export default SearchBar;
