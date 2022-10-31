import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

import AccountToggle from "../accounttoggle/AccountToggle";
import SearchBar from "../searchbar/SearchBar";
import SiteLogo from "../sitelogo/SiteLogo";
import ExpandedSearch from "../expandedSearch/ExpandedSearch";

import Home from "../../pages/home/Home";

import "./header.css";

function Header() {
  const [active, setActive] = useState(null);

  const [activeBtn, setActiveBtn] = useState("btn1");
  const [staysClicked, setStaysClicked] = useState(false);
  const [expClicked, setExpClicked] = useState(false);
  const [openExpanded, setOpenExpanded] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);

  const navigate = useNavigate();

  const activeCallback = (tab) => {
    setActive(!active);
    setActiveBtn(tab)
  };
  // const promptClicked = () =>{
  //   setOpenExpanded(!openExpanded);
  // };

  useEffect(() => {
console.log(`closeSearch ${closeSearch} active ${active} activeBtn ${activeBtn} `)
  }, [closeSearch, active])

  return (
    <>
      <div className="headerContainer">
        <div className="header page-padding">
          <Link to="/">
            <SiteLogo />
          </Link>         
          <div className="headerCenter">
            {active === null ? (
              <>
                <SearchBar setSearchTab={activeCallback} />
              </>
            ) : (
              <>
                <div
                  className={`expandedSearch ${active === null ? "hide" : ""}`}
                >
                  <div className="searchTabs">
                    <span
                      className="searchTab searchItem"
                      onClick={() => {
                        setActiveBtn("btn1");
                        setStaysClicked(!staysClicked);
                      }}
                    >
                      <button
                        className={`${active === "btn1" ? "clickedTab" : null}`}
                      >
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
                    <button
                      className="buttonTop"
                      onClick={() => {
                        setCloseSearch(!closeSearch); 
                        setActive(null);
                      setActiveBtn("")}}
                    >    
                      <IoCloseCircle size={"2.5em"} />
                    </button>
                  </div>
                  
                </div>
              </>
            )}           
          </div>

          <AccountToggle />
        </div>
        {active !== null  && <ExpandedSearch active={activeBtn} /> }
      </div>
    </>
  );
}

export default Header;
