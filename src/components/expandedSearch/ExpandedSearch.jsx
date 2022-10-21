import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
} from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


// import List from "../list/List.jsx";

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { IoSearchSharp } from "react-icons/io5";
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchClicked, setSearchClicked] = useState(false);

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

  const [query, setQuery] = useState({
    destination: "",
    dates: {},
    guests: {},
  });

  // const [query, setQuery] = useState({
  //   destination: "",
  //   startDate: dates.startDate,
  //   endDate: dates.endDate,
  //   guests: Object.entries(guests).filter((a) => a[1] !== 0),
  // });

  const navigate = useNavigate();

  // const whereRef = useOutsideClick(() => {
  //   setOpenWhere((openWhere) => !openWhere);
  // });
  // const whenRef = useOutsideClick(() => {
  //   setOpenWhen((openWhen) => !openWhen);
  // });
  // const whoRef = useOutsideClick(() => {
  //   setOpenWho((openWho) => !openWho);
  // });

  const getCountry = (e) => {
    setCountry(e.targetValue);
  };

  const guestOptions = [
    { type: "Adults", info: "Ages 13 and above" },
    { type: "Children", info: "Ages 13 below" },
    { type: "Infants", info: "Under 2" },
    { type: "Pets", info: "Support pets" },
  ];

  const filterGuests = (obj) => Object.entries(obj).filter((a) => a[1] !== 0);

  const capitalizeGuests = (arr) => {
    arr.forEach((val) => {
      val[0] = val[0].charAt(0).toUpperCase() + val[0].slice(1);
    });
    const string = arr.map((val) => val.join(" ")).join();
    return string;
  }

  const formatGuests = () => {   
    const filtered = filterGuests(guests);

    if (filtered.length !== 0) {
      const string = capitalizeGuests(filtered);
      return string;
    } else {
      return "Add guests";
    }
  };

  const handleSetGuests = (opt, op) => {
    setGuests((prev) => {
      return {
        ...prev,
        [opt]: op === "m" ? guests[opt] - 1 : guests[opt] + 1,
      };
    });
  };

  const handleCountry = (props) => {
    setCountry(props);
  };
  
  const search = () => {
    setQuery({destination: country,
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      guests: (Object.fromEntries(Object.entries(guests).filter(([key, val]) => val !== 0)))});
    // setSearchParams({country:country, datas:dates, guets:guests});
    navigate("/search", {state:{country:country, startDate:dates[0].startDate, endDate:dates[0].endDate, guests:Object.fromEntries(filterGuests(guests)) } });
  }

  useEffect(() => {
    console.log(`staysClicked ${staysClicked} expClicked ${expClicked}`);
  }, [staysClicked, expClicked]);

  useEffect(() => {
    if(searchClicked){
    // setQuery({destination: country,
    //   startDate: dates[0].startDate,
    //   endDate: dates[0].endDate,
    //   guests: (Object.fromEntries(Object.entries(guests).filter(([key, val]) => val !== 0)))});
      console.log(query);}
  },[searchClicked, query]);
    
       
  // }, [searchClicked]);

  // whyDidYouRender(React, {
  //   onlyLogs: true,
  //   titleColor: "green",
  //   diffNameColor: "aqua",
  //   trackAllPureComponents: true
  // });
  return (
    <>
      <div className={`expandedSearch ${activeBtn === null ? "hide" : ""}`}>

        
        <div className="searchTabs">
          <span
            className="searchTab searchItem"
            onClick={() => {
              setActive("btn1");
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
                setActive("btn2");
              }
            }}
          >
            <button>Experiences</button>
          </span>
          <span
            className="searchTab searchItem"
            onClick={() => {
              setActive("btn3");
            }}
          >
            <button>Online Experiences</button>
          </span>
        </div>
      </div>
      {query.destinations}
      {tabClicked && (
        <div className="searchOptionsContainer">
          <div className="searchOptions">
            <div
              className={`destination searchOption pointer ${
                active === "btn1" ? "activeTab" : ""
              }`}
            >
              <label htmlFor="stayDestination">Where</label>
              <input
                type="text"
                name="stayDestination"
                id="stayDestination"
                placeholder="Search destinations"
                value={country}
                onClick={() => setOpenWhere(!openWhere)}
              />
              {openWhere && (
                <>
                  <div
                    className="tabPopout popOutContent staysSelectorContainer"
                    onClick={() =>
                      console.log(`From tabPopOut openWhere : ${openWhere}`)
                    }
                    // ref={whereRef}
                  >
                    <div className="popOutColumn continents">
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("region/asia");
                        }}
                      >
                        Asia
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("region/africa");
                        }}
                      >
                        Africa
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("region/europe");
                        }}
                      >
                        Europe
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("subregion/north%20america");
                        }}
                      >
                        North America
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("region/oceania");
                        }}
                      >
                        Oceania
                      </span>
                      <span
                        className="continent"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            `From continent openWhere : ${openWhere}`
                          );
                          setContinent("subregion/south%20america");
                        }}
                      >
                        South America
                      </span>
                    </div>
                    <div className="popOutColumn popOutScroll countries">
                      {/* Hello! */}

                      {continent !== "" ? (
                        <Suspense fallback={<div>Loading</div>}>
                          <List
                            endpoint={continent}
                            fields={"?fields=name"}
                            itemClass={"country"}
                            callback={handleCountry}
                          />
                        </Suspense>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="dates searchOption pointer">
              {active === "btn2" ? (
                <>
                  <div
                    className={`date ${active === "btn2" ? "activeTab" : null}`}
                  >
                    <div className="checkIn">
                      <label htmlFor="checkInDate">Dates</label>
                      <input
                        type="text"
                        name=""
                        id="checkInDate"
                        placeholder="Add dates"
                        value={format(dates[0].startDate, "MMM d")}
                        // className="bold-text"
                        onClick={() => setOpenWhen(!openWhen)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`date ${active === "btn2" ? "activeTab" : null}`}
                  >
                    <div className="checkIn">
                      <label htmlFor="checkInDate">Check in</label>
                      <input
                        type="text"
                        name=""
                        id="checkInDate"
                        placeholder="Add dates"
                        value={format(dates[0].startDate, "MMM d")}
                        onClick={() => setOpenWhen(!openWhen)}
                        // className="bold-text"
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
                        // className="bold-text"
                      />
                    </div>
                  </div>
                </>
              )}
              {openWhen && (
                <>
                  <div className="tabPopout popOutContent dateSelectorContainer">
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
              <div
                className="guestPickerContainer"
                onClick={() => setOpenWho(!openWho)}
              >
                <label htmlFor="guestPicker">Who</label>
                <input
                  type="text"
                  name="guestPicker"
                  id="guest"
                  // placeholder= {formatGuests()}
                  value={formatGuests()}
                />
              </div>
              <div
                className="searchItem searchOption searchButton pointer"
                onClick={(e) =>{ 
                  e.stopPropagation();                  
                  search();
                }
                }>
                <IoSearchSharp size={"1.5em"} />
                <span className="body-text">Search</span>
              </div>

              {openWho && (
                <>
                  <div
                    className="guestSelectorContainer popOutContent tabPopout"
                    // ref={whoRef}
                  >
                    {
                      guestOptions.map((option, index) => {
                        let opt = option.type.toLowerCase();
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
