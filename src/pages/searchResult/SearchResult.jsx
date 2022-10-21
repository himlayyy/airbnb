import React from "react";
import {useState, useEffect, Suspense} from "react";
import {  useSearchParams, useLocation } from "react-router-dom";
import Destinations from "../../components/destinations/Destinations";
import StayFilter from "../../components/stayFilter/StayFilter";
import {HiMap} from "react-icons/hi";
import {FaMapMarker} from "react-icons/fa";
import axios from "axios";
// import Map from "../../components/map/Map";
import Map, {Marker} from "react-map-gl";
import "./searchResult.css";
import {generateOptions} from "../../helpers/helpers";
// import { accessToken } from "mapbox-gl";

const mapboxAccessToken =
  "pk.eyJ1IjoiZGVtYXVyaWVyIiwiYSI6ImNsOWIxOHZlazAxNTMzdW84aDNhYWFweHAifQ.1PTEHwG13mwLValeNyq2Kg";

function SearchResult() {
  const [viewState, setViewState] = useState({
    latitude:0,
    longitude:0,
    zoom:5
  });
  const locationData = useLocation();
  const [country, setCountry] = useState(locationData.state.country);
  // const [location, setLocation] = useState(location.state);
  // const {destination, dates, guests} = useLocation();

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

  // setViewState(Object.values(res[0])[0]))
  return (
    <>
      <div className="searchResultContainer">
        <div className="searchResult ">
          <div className="destinations">
            <div className="header">
              <p>Over 1,000 homes in {country} {viewState.latitude} {viewState.longitude} </p>
              <StayFilter />
            </div>
            <div className="container">
              {/* <Destinations /> */}
            </div>
          </div>
          <div className="map">
            <Suspense fallback={<div style={{display:"grid", placeItems:"center"}}>Loading</div>}>
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
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;


