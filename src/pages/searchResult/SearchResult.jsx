import React from "react";
import {useState, useEffect, Suspense, useContext} from "react";
import {  useSearchParams, useLocation } from "react-router-dom";
import Destinations from "../../components/destinations/Destinations";
import StayScroller from "../../components/stayScroller/StayScroller";
import StayFilter from "../../components/stayFilter/StayFilter";
import NotFound from "../../components/notfound/NotFound";
import { getRoomsInCountry }  from "../../firebase";

import axios from "axios";
import Map, {Marker} from "react-map-gl";
import {SearchContext} from "../../context/SearchContext";

import "./searchresult.css";


function SearchResult() {
  const [rooms, setRooms] = useState([]);
  const [viewState, setViewState] = useState({
    latitude:0,
    longitude:0,
    zoom:13
  });

  const [ searchParams ] = useSearchParams();
  const [width,setWidth] = useState(window.innerWidth);

  const [openDestinations, setOpenDestinations] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {search} = useContext(SearchContext);
  const {country, dates, guests} = search;

  const url = useLocation();

  // const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY;
  // const mapboxAccessToken = "pk.eyJ1IjoiZGVtYXVyaWVyIiwiYSI6ImNsYWpoOG84ZDBkNTgzb3BqOGFtZmlxd2MifQ.l3c6CXayb4EtdxMHehsCOQ"

  const mapboxAccessToken = ""
 
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

  },[width]);
  
  useEffect(() =>{
    const country = searchParams.get("country").toLowerCase();
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

    let roomsInCountry = getRoomsInCountry(
        country.toLowerCase()
      ).then((rooms) => setRooms(rooms));
  },[country]);

   return (
    <>
    <div className="searchPage page-padding">
      <div className="searchResultContainer">
        <div className="searchResult ">
          
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

          <div className="destinations-results">
            <div className="header">
              
              <button disabled={!isMobile} onClick={() => setOpenDestinations(!openDestinations)}>
                Over 1,000 homes in {country} {`${viewState.latitude}, ${viewState.longitude}`} 
              </button>
              <StayFilter />
            </div>

              {rooms.length !== 0 ?
                (<div className={`destination-container ${isMobile ? `${openDestinations ? 'open' : 'close'}` :""}`}>
                    <Destinations rooms={rooms} country={country}/>
                </div>)
                :
                (<NotFound result={country}/> )
              }
                
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SearchResult;


