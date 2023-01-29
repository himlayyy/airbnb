import React from "react";
import {useState, useEffect, Suspense, useContext, useMemo} from "react";
import {  useSearchParams, useLocation } from "react-router-dom";
import Destinations from "../../components/destinations/Destinations";
import StayScroller from "../../components/stayScroller/StayScroller";
import StayFilter from "../../components/stayFilter/StayFilter";
import DestinationItem from "../../components/destinationItem/DestinationItem";
import NotFound from "../../components/notfound/NotFound";
import { getRoomsInCountry }  from "../../firebase";

import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
import Map, {Marker, Popup, NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from "react-map-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
import {SearchContext} from "../../context/SearchContext";

import "./searchresult.css";



const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

function Pin({size = 20}) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
};

function SearchResult() {
  const [rooms, setRooms] = useState([]);
  const [viewState, setViewState] = useState({
    latitude:0,
    longitude:0,
    zoom:5,
  });
  const [pins, setPins] = useState([]);

  const [markerCoords, setMarkerCoords] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  const [ searchParams ] = useSearchParams();
  const [width,setWidth] = useState(window.innerWidth);

  const [openDestinations, setOpenDestinations] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {search} = useContext(SearchContext);
  const {country, dates, guests} = search;

  const url = useLocation();

  // const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY;
  const mapboxAccessToken = "pk.eyJ1IjoiZGVtYXVyaWVyIiwiYSI6ImNsYWpoOG84ZDBkNTgzb3BqOGFtZmlxd2MifQ.l3c6CXayb4EtdxMHehsCOQ";

  const getPinDetails = (id) => {
    console.log(id);
    let pinDetails = rooms.find((room) => id === room.id );

    console.log(pinDetails)
    

    setPopupInfo({
      latitude:pinDetails.location[0].latitude,
      longitude:pinDetails.location[0].longitude,
      id:id,
      roomName:pinDetails.roomName,
      images:pinDetails.images,
      rating:pinDetails.rating,
      price:pinDetails.price,
      country:country,    
    });
  }

 
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
    console.log("in search results");
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
    console.log("in search result useeffect!");

  },[country]);

  useEffect(() => {
    const getRoomCoordinates = () => {
      console.log("in getRoomCoordinates");
       let roomLocations = rooms.map((room) =>
       { return { 
          ["longitude"]: room.location[0].longitude, 
          ["latitude"]: room.location[0].latitude,
          ["id"]:room.id,
          ["roomName"]:room.roomName}});
      
      setPins(roomLocations);
  
      console.log("done in getRoomCoordinates");
        console.log(roomLocations)
    };
    
    if(rooms.length !== 0){
      getRoomCoordinates();
    }
  },[rooms])
  useEffect(() => {
    console.log(popupInfo)
  },[popupInfo]);


   return (
    <>
    <div className="searchPage page-padding">
      <div className="searchResultContainer">
        <div className="searchResult ">
          
          <div className="map">
            <Suspense fallback={<div style={{display:"grid", placeItems:"center"}}>Loading</div>}>
            
            <Map
             {...viewState}
              mapboxAccessToken={ mapboxAccessToken}
              mapStyle="mapbox://styles/mapbox/streets-v9"
               onMove={evt => setViewState(evt.viewState)}
            >
           
            {pins.map((pin) => (
                <Marker
                    key={`marker-${uuidv4()}`}
                    longitude={pin.longitude}
                   latitude={pin.latitude}
                   anchor="bottom"
                   onClick= {(e) => {
                    e.originalEvent.stopPropagation();
                    getPinDetails(pin.id);
                   }} >
                   <Pin/>
                 </Marker>
              ))}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
               {popupInfo && (
                <Popup
                  anchor = "top"
                  longitude = {popupInfo.longitude}
                  latitude = {popupInfo.latitude}
                  onClick={() => console.log(popupInfo)}
                  onClose = {() => setPopupInfo(null)}>
                    <DestinationItem 
                      id={popupInfo.id}
                      country={popupInfo.country}
                      images={popupInfo.images}
                      roomName={popupInfo.roomName}
                      rating={popupInfo.rating}
                      price={popupInfo.roomPrice} />
                </Popup>
                )}
              </Map >           
            </Suspense>
          </div>
          <div className="destinations-results">
            <div className="header">
              
              <button disabled={!isMobile} onClick={() => setOpenDestinations(!openDestinations)}>
                Over {rooms.length} homes in {country}
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


