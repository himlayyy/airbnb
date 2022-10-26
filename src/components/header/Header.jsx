import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./header.css";

import AccountToggle from "../accounttoggle/AccountToggle";
import SearchBar from "../searchbar/SearchBar";
import SiteLogo from "../sitelogo/SiteLogo";
import ExpandedSearch from "../expandedSearch/ExpandedSearch";

import Home from "../../pages/home/Home";

function Header() {
  const [active, setActive] = useState(null);

  const [activeBtn, setActiveBtn] = useState(null);
  const [staysClicked, setStaysClicked] = useState(false);
  const [expClicked, setExpClicked] = useState(false);
  const [guestsClicked, setGuestsClicked] = useState(false);


  const navigate = useNavigate();

  const activeCallback = (optionName) => {
    setActive(optionName);
  };

  return (
    <>
    <div className="headerContainer">
    <div className="header page-padding">
      <Link to="/">
      <SiteLogo className="hide1120"/>
      </Link>
      <div className="headerCenter">
        {active === null ? (
          <>
            <SearchBar setSearchTab={activeCallback} />
          </>
        ) : (
          <>
            <div className={`expandedSearch ${active === null ? "hide" : ""}`}>
        <div className="searchTabs">
          <span
            className="searchTab searchItem"
            onClick={() => {
              setActiveBtn("btn1");
              setStaysClicked(!staysClicked);
            }}
          >
            <button className={`${active === "btn1" ? "clickedTab" : null}`}>
              Stays
            </button>
          </span>
          <span
            className="searchTab searchItem"
            onClick={() => {
              if (active !== "btn2") {
                setExpClicked(!expClicked);
                setActiveBtn("btn2");
              }
            }}
          >
            <button>Experiences</button>
          </span>
          <span
            className="searchTab searchItem"
            onClick={() => {
              setActiveBtn("btn3");
            }}
          >
            <button>Online Experiences</button>
          </span>
        </div>
      </div>
          </>
        )}
      </div>

      
        <AccountToggle />

    </div>
    {active !== null ?

    (<ExpandedSearch active={activeBtn}/>)
    : 
    ""
    }
    </div>
        </>
  );
}

export default Header;
