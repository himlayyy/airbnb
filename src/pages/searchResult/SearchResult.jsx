import React from "react";
import { useLocation } from "react-router-dom";
import Destinations from "../../components/destinations/Destinations";
import StayFilter from "../../components/stayFilter/StayFilter";
// import Map from "../../components/map/Map";
import Map from "react-map-gl";
import "./searchResult.css";
import { accessToken } from "mapbox-gl";

accessToken =
  "pk.eyJ1IjoiZGVtYXVyaWVyIiwiYSI6ImNsOWIxOHZlazAxNTMzdW84aDNhYWFweHAifQ.1PTEHwG13mwLValeNyq2Kg";

function SearchResult() {
  // const location = useLocation();

  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  return (
    <>
      <div className="searchResultContainer">
        <div className="searchResult ">
          <div className="destinations">
            <div className="header">
              <p>Over 1,000 homes</p>
              <StayFilter />
            </div>
            <div className="container">
              <Destinations />
            </div>
          </div>
          <div className="map">
            <Map
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14,
              }}
              mapboxAccessToken={accessToken}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
