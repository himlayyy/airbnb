import React, { useState } from "react";
import "./searchbar.css";

import {IoSearchCircleSharp} from "react-icons/io5";

function SearchBar({setSearchTab}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [option, setOption] = useState('')

  
  return (
    <div className="search">
      {/* <input
        className="searchBox"
        type="text"
        placeholder="Where to?"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          console.log(searchQuery);
        }}
      />       */}
      <button className="staysGroup searchItem" onClick={() =>setSearchTab("btn1")}>Anywhere</button>
      <hr/>
      <button className="experiencesGroup searchItem" onClick={() =>setSearchTab("btn2")}>Any week</button>
      <hr/>
      
      <button className="onlineExperiences searchItem"  onClick={() =>setSearchTab("btn3")}>Add guests</button>
      <button className="searchButton searchItem">
      <IoSearchCircleSharp size={"3em"}/></button>
    </div>

  );
}

export default SearchBar;
