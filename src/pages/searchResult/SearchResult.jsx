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
  "pk.eyJ1IjoiZGVtYXVyaWVyIiwiYSI6ImNsOWIxOHZlazAxNTMzdW84aDNhYWFweHAifQ.1PTEHwG13mwLValeNyq2Kg";

function SearchResult() {
  const [viewState, setViewState] = useState({
    latitude:0,
    longitude:0,
    zoom:13
  });

  const searchData = useContext(SearchContext);
  const {country, dates, guests} = searchData.search;
  
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
      let [lat, long] = Object.values(res[0])[0];
      console.log(lat, long);
      setViewState({latitude:lat, longitude:long});
    console.log(viewState);
    });
  },[country]);

   return (
    <>
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

          <div className="destinations">
            <div className="header">
              
              <p>Over 1,000 homes in {country} {`${viewState.latitude}, ${viewState.longitude}`} </p>
              <StayFilter />
            </div>
            <div className="container">
              {/* <Destinations /> */}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SearchResult;


