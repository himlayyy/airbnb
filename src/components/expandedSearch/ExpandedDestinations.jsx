import React, { useState, Suspense } from "react";
import List from "../list/List";


function ExpandedDestinations({active="", callback}){
  const [openWhere, setOpenWhere] = useState(false);
	const [continent, setContinent] = useState("region/asia");
  const [country, setCountry] = useState("");

  const handleCountry = (props) => {
    setCountry(props);
    // updateSearchContext("country", props);
    setOpenWhere(!openWhere);
  };

	return(
    <>
      <div className={`destination searchOption pointer ${
                active === "btn1" ? "activeTab" : ""
              }`}>
      <label htmlFor="stayDestination">Where</label>
      <input
        type="text"
        name="stayDestination"
        id="stayDestination"
        placeholder="Search destinations"
        value={country}
        onClick={() => setOpenWhere(!openWhere)}/>
    </div>
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
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("region/asia");
              }}
            >
              Asia
            </span>
            <span
              className="continent"
              onClick={(e) => {
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("region/africa");
              }}
            >
              Africa
            </span>
            <span
              className="continent"
              onClick={(e) => {
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("region/europe");
              }}
            >
              Europe
            </span>
            <span
              className="continent"
              onClick={(e) => {
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("subregion/north%20america");
              }}
            >
              North America
            </span>
            <span
              className="continent"
              onClick={(e) => {
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("region/oceania");
              }}
            >
              Oceania
            </span>
            <span
              className="continent"
              onClick={(e) => {
                // e.stopPropagation();
                console.log(`From continent openWhere : ${openWhere}`);
                setContinent("subregion/south%20america");
              }}
            >
              South America
            </span>
          </div>
          <div className="popOutColumn popOutScroll countries">
            {/* Start here */}
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
    )
    }
    </>
		

	)
};

export default ExpandedDestinations;


