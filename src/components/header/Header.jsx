import React, { useState, useContext, useReducer } from "react";
import { useNavigate, Link, createSearchParams } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

import AccountToggle from "../accounttoggle/AccountToggle";
import SearchBar from "../searchbar/SearchBar";
import SiteLogo from "../sitelogo/SiteLogo";

import { SearchContext } from "../../context/SearchContext";
// import ExpandedSearch from "../expandedSearch/ExpandedSearch";
import ExpandedDestinations from "../../components/expandedSearch/ExpandedDestinations";
import ExpandedDates from "../../components/expandedSearch/ExpandedDates";
import ExpandedGuests from "../../components/expandedSearch/ExpandedGuests";
import { IoSearchSharp } from "react-icons/io5";


import { formatGuests, filterGuests } from '../../helpers/helpers';
import { format } from "date-fns";


// import Home from "../../pages/home/Home";

import "./header.css";
const intialState = { country: "",  dates:{
  
}, guests: {}} ;

function Header() {

  // Original header states
  const [active, setActive] = useState(null);

  const [activeBtn, setActiveBtn] = useState("btn1");
  const [staysClicked, setStaysClicked] = useState(false);
  const [expClicked, setExpClicked] = useState(false);
  // const [openExpanded, setOpenExpanded] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);

  // End


  // const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const { updateSearchContext } = useContext(SearchContext);

  
  // const promptClicked = () =>{
  //   setOpenExpanded(!openExpanded);
  // };

  const reducer = (state, action) => {
    switch (action.type){
      case "selected_country":{
        return{
         ...state,
          country: action.selectedCountry
        };
      }
      case "selected_dates":{
        return{
          ...state,
          dates: action.selectedDates
        }
      };
      case "selected_guests":{
        return{
          ...state,
          guests:action.selectedGuests
        }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, intialState);


  const handleSelectedCountry = (country) => {
    dispatch({
      type:"selected_country",
      selectedCountry: country
    });
  };

  const handleSelectedDates = ({endDate, startDate}) => {
    dispatch({
      type:"selected_dates",
      selectedDates: {endDate,startDate}
    })
  }

  const handleSelectedGuests = (guests) => {
    dispatch({
      type:"selected_guests",
      selectedGuests: guests
    })
  }
  // const handleSelectedDates = (dates) => {
  //   console.log(dates);
  // }

  // const logCountry = (country) =>{
  //   setCountry(country);
  // };

  const updateContext = () =>{
    updateSearchContext("country", state.country);
    updateSearchContext("guests", Object.fromEntries(filterGuests(state.guests)));
    updateSearchContext("guestsString", formatGuests(state.guests));
    updateSearchContext("dates", {
      startDate: state.dates.startDate,
      endDate: state.dates.endDate,
    });
    updateSearchContext("datesString", {
      start: format(state.dates.startDate, "MMM d"),
      end: format(state.dates.endDate, "MMM d"),
    });
  }

  const goSearch = () => {
    updateContext();
    navigate({pathname: `/search`, search: `?${createSearchParams({country:`${state.country}`, sort:"date", order:"newest"})}`});
  };

  // Original header functions

  const activeCallback = (tab) => {
    setActive(!active);
    setActiveBtn(tab)
  };

  const closeExpanded = () => {
    setActive(null);
  };

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
                        setActiveBtn("")
                      }}
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
        {active !== null && 
          <>
            <div className="searchOptionsContainer">
              <div className="searchOptions">
                <ExpandedDestinations active={`${active === "btn1" ? "activeTab" : ""}`} callback={handleSelectedCountry} />
                <ExpandedDates  active={`${active === "btn2" ? "activeTab" : ""}`} callback={handleSelectedDates} />
                <div
                  className={`guests searchOption pointer ${active === "btn3" ? "activeTab" : ""
                    }`}>
                  <ExpandedGuests active={""} callback={handleSelectedGuests}/>
                  <div
                    className="searchItem searchOption searchButton pointer button_effect"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeExpanded();                  
                      goSearch();
                    }}
                  >
                    <IoSearchSharp size={"1.5em"} />
                    <span className="body-text">Search</span>
                  </div>
                </div> 
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default Header;
