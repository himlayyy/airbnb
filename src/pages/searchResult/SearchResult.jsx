import React from "react";
import {useState, useEffect, Suspense, useContext} from "react";
import {  useSearchParams, useLocation } from "react-router-dom";
import Destinations from "../../components/destinations/Destinations";
import StayScroller from "../../components/stayScroller/StayScroller";
import StayFilter from "../../components/stayFilter/StayFilter";

import axios from "axios";
import Map, {Marker} from "react-map-gl";
import "./searchResult.css";

import {SearchContext} from "../../context/SearchContext";

const mapboxAccessToken =
  process.env.REACT_APP_MAPBOX_KEY;

function SearchResult() {
  const [viewState, setViewState] = useState({
    latitude:0,
    longitude:0,
    zoom:13
  });
  const [width,setWidth] = useState(window.innerWidth);

  const [openDestinations, setOpenDestinations] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {search} = useContext(SearchContext);
  const {country, dates, guests} = search;

  useEffect(() =>{
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    if(width <= 743){
      setIsMobile(true);
    }
    else{
      setIsMobile(false);
    }
    console.log(isMobile);
    console.log(width);

  },[width])
  
  useEffect(() =>{
    const getCoordinates = async (country) => {
      const endpoint = `https://restcountries.com/v3.1/name/${country}?fields=latlng`;
      try{
        let res = await axios.get(endpoint);        
        return res.data
      }
      catch(err){
        console.log(err)
      }
    
    };
    getCoordinates(country).then(res=> {
      let [lat, long] = Object.values(res[0])[2];
      console.log(lat, long);
      setViewState({latitude:lat, longitude:long});
      console.log(viewState);
    });
  },[country]);

   return (
    <>
    <div className="searchPage page-padding">
      <StayScroller />
      <div className="searchResultContainer">
        <div className="searchResult ">
          
          <div className="map">
            <div className="temp">Map</div>
            {/* <Suspense fallback={<div style={{display:"grid", placeItems:"center"}}>Loading</div>}>
            <Map
             {...viewState}
            //  onMove={evt => setViewState(evt.viewState)}
              mapboxAccessToken={ mapboxAccessToken}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker 
                latitude = {viewState.latitude}
                longitude = {viewState.longitude}           
                // anchor = "center"
                color="red" 
                />
              </Map >           
            </Suspense> */}
          </div>

          <div className="destinations-results">
            <div className="header">
              
              <button disabled={!isMobile} onClick={() => setOpenDestinations(!openDestinations)}>
                Over 1,000 homes in {country} {`${viewState.latitude}, ${viewState.longitude}`} 
              </button>
            </div>
            {isMobile ?
              (<div className={`destination-container ${openDestinations ? "open" : "close" }`}>
                
                  <Destinations />
              
              </div>) :
              (
                <Destinations />
              ) 
            }    
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SearchResult;


