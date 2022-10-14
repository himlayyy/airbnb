import React, { useState, useEffect, useRef, useSuspense, Suspense } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import whyDidYouRender from "@welldone-software/why-did-you-render";


// import List from "../list/List.jsx";


import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { IoNuclearOutline, IoSearchSharp } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";

import "./expandedsearch.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const List = React.lazy(() => import("../list/List.jsx"));

function ExpandedSearch({ activeBtn }) {
  // const [open, setOpen] = useState(false);

  const [tabClicked, setTabClicked] = useState(true);
  const [active, setActive] = useState(activeBtn);

  const [openWhere, setOpenWhere] = useState(false);
  const [openWhen, setOpenWhen] = useState(false);
  const [openWho, setOpenWho] = useState(false);

  const [staysClicked, setStaysClicked] = useState(false);
  const [expClicked, setExpClicked] = useState(false);
  const [guestsClicked, setGuestsClicked] = useState(false);

  const [continent, setContinent] = useState("region/asia");
  const [country, setCountry] = useState("");

  
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [query, setQuery] =  useState({
    "destination":"",
    "startDate": dates.startDate,
    "endDate": dates.endDate,
    "guests" : guests,
  });

  // const whereRef = useOutsideClick(() => {
  //   setOpenWhere((openWhere) => !openWhere);
  // });
  // const whenRef = useOutsideClick(() => {
  //   setOpenWhen((openWhen) => !openWhen);
  // });
  // const whoRef = useOutsideClick(() => {
  //   setOpenWho((openWho) => !openWho);
  // });

const getCountry = (e) =>{
  setCountry(e.targetValue)
}

  const guestOptions = [
    { type: "Adults", info: "Ages 13 and above" },
    { type: "Children", info: "Ages 13 below" },
    { type: "Infants", info: "Under 2" },
    { type: "Pets", info: "Support pets" },
  ];

  const handleSetGuests = (opt, op) => {
    setGuests((prev) => {
      return {
        ...prev,
        [opt]: op === "m" ? guests[opt] - 1 : guests[opt] + 1,
      };
    });
  };

  const handleCountry = (props) =>{
    console.log(props);
    setCountry(props);
  }

  useEffect(() =>{
    console.log(`staysClicked ${staysClicked} expClicked ${expClicked}`);
  },[staysClicked, expClicked])

useEffect(() => {
  console.log(`openWhere: ${openWhere}`);
},[openWhere]);

  // whyDidYouRender(React, {
  //   onlyLogs: true,
  //   titleColor: "green",
  //   diffNameColor: "aqua",
  //   trackAllPureComponents: true
  // });
  return (
    <>
    
      <div className={`expandedSearch ${activeBtn === null ? "hide" : ""}`}>
        {/* <div className="guest">
          Active btn: {`${activeBtn} staysClicked ${staysClicked} expClicked ${expClicked}`}
        </div> */}
        {/* <div>{countries}</div> */}
        <div className="searchTabs">
          <span
            className="searchTab searchItem"
            onClick={() => {
              setActive("btn1");
              setStaysClicked(!staysClicked);
            }}
          >
            {/* <button className={`${active === "btn1" ? "clickedTab" : ""}`} */}
            <button className={`${active === "btn1" ? "clickedTab" : null}`}>
              Stays
            </button>
          </span>
          <span
            className="searchTab searchItem"
            onClick={() => {
              // setTabClicked(!tabClicked);
              if (active !== "btn2") {
                setExpClicked(!expClicked);
                setActive("btn2");
              }
            }}
          >
            <button>Experiences</button>
          </span>
          <span
            className="searchTab searchItem"
            onClick={() => {
              // setTabClicked(!tabClicked);
              // setGuestsClicked(!guestsClicked);
              setActive("btn3");
            }}
          >
            <button>Online Experiences</button>
          </span>
        </div>
      </div>
      {/* {tabClicked && ( */}
      {tabClicked && (
        <div className="searchOptionsContainer">
          <div className="searchOptions">
            {/* <div className={`destination searchOption pointer ${staysClicked ? 'activeTab' : ''}`}> */}
            <div className={`destination searchOption pointer ${active === "btn1" ? "activeTab" : ""
              }`}
              onClick={() => setOpenWhere(!openWhere)}>
              <label htmlFor="stayDestination">Where</label>
              <input
                type="text"
                name="stayDestination"
                id="stayDestination"
                placeholder="Search destinations"
                value={country}
              />
              {openWhere && (
                <>
                  <div className="tabPopout popOutContent staysSelectorContainer"
                    onClick={() => console.log(`From tabPopOut openWhere : ${openWhere}`)}
                    // ref={whereRef} 
                  >
                    <div className="popOutColumn continents">
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`);setContinent("region/asia")}}
                      >
                        Asia
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`); setContinent("region/africa")}}
                      >
                        Africa
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`); setContinent("region/europe")}}
                      >
                        Europe
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`); 
                          setContinent("subregion/north%20america")
                        }}
                      >
                        North America
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`); setContinent("region/oceania")}}
                      >
                        Oceania
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {e.stopPropagation();console.log(`From continent openWhere : ${openWhere}`); 
                          setContinent("subregion/south%20america")
                        }}
                      >
                        South America
                      </span>
                    </div>
                    <div className="popOutColumn popOutScroll countries">
                     {/* Hello! */}

                      {continent !== "" ?    
                    (<Suspense fallback={
                      <div>Loading</div>
                    }>
                    
                    <List
                      endpoint={continent}
                        fields={"?fields=name"}
                        itemClass={"country"}
                        callback= {handleCountry}
                        />
                        </Suspense>) : null} 
                    </div>
                  </div>
                </>
              )}
            </div>
                        {/* {continent !== "" ?    
                    (<List
                      endpoint={continent}
                        fields={"?fields=name"}
                        itemClass={"country"}
                        callback= {handleCountry}
                        />) : null}                 */}
            <div className="dates searchOption pointer">
              
                          
              
              {active === "btn2" ?
             
              (<>
              <div
                className={`date ${active === "btn2" ? "activeTab" : null}`}
                onClick={() => setOpenWhen(!openWhen)}
              >
                <div className="checkIn">
                  <label htmlFor="checkInDate">Dates</label>
                  <input
                    type="text"
                    name=""
                    id="checkInDate"
                    placeholder="Add dates"
                    value={format(dates[0].startDate, "MMM d")}
                    className="bold-text"
                  />
                </div>
              </div>
              </>) :
               (<>
                <div
                  className={`date ${active === "btn2" ? "activeTab" : null}`}
                  onClick={() => setOpenWhen(!openWhen)}
                >
                  <div className="checkIn">
                    <label htmlFor="checkInDate">Check in</label>
                    <input
                      type="text"
                      name=""
                      id="checkInDate"
                      placeholder="Add dates"
                      value={format(dates[0].startDate, "MMM d")}
                      className="bold-text"
                    />
                  </div>
                </div>
                <div className="date">
                  <div className="checkOut">
                    <label htmlFor="checkOutDate">Check out</label>
                    <input
                      type="text"
                      name="checkOutDate"
                      id="checkOutDate"
                      placeholder="Add dates"
                      value={format(dates[0].endDate, "MMM d")}
                      className="bold-text"
                      />
                  </div>
                </div>
                </>)
              }
              {openWhen && (
                <>
                  <div
                    className="tabPopout popOutContent dateSelectorContainer"
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                    />
                  </div>
                </>
              )}
            </div>
            
            
            <div
              className={`guests searchOption pointer ${
                active === "btn3" ? "activeTab" : ""
              }`}
             
            >
              <div className="guestPickerContainer"  onClick={() => setOpenWho(!openWho)}>
                <label htmlFor="guestPicker">Who</label>
                <input
                  type="text"
                  name="guestPicker"
                  id="guest"
                  placeholder="Add guests"
                />
              </div>
              <div className="searchItem searchOption searchButton pointer" onClick={(()=> console.log("hello"))}>
              <IoSearchSharp size={"1.5em"} />
                <span className="body-text">Search</span>
                </div>

                {/* <span className="searchspan pointer"> */}
                {/* <div className="searchspanContents"> */}
                {/* <button className="searchItem searchOption searchButton pointer"> */}
                
                {/* </button> */}
                {/* </div> */}
                {/* </span> */}

              {openWho && (
                <>
                  <div
                    className="guestSelectorContainer popOutContent tabPopout"
                    // ref={whoRef}
                  >
                    {
                      // let vals = Object.values(guests);
                      guestOptions.map((option, index) => {
                        let opt = option.type.toLowerCase();
                        console.log(opt);
                        return (
                          <div className="popOutRow">
                            <div className="guest">
                              <span className="guestType">{option.type}</span>
                              <span className="guestInfo">{option.info}</span>
                            </div>

                            <div className="guestBtns">
                              <button
                                className="minus"
                                disabled={guests[opt] === 0}
                                onClick={() => handleSetGuests(opt, "m")}
                              >
                                <BiMinus size={"1.5em"} />
                              </button>
                              <span>{guests[opt]}</span>
                              <button
                                className="plus"
                                onClick={() => handleSetGuests(opt, "p")}
                              >
                                <BiPlus size={"1.5em"} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpandedSearch;
