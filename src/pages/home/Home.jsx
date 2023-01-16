import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/header/Header";
import Destinations from "../../components/destinations/Destinations";
import HomeFooter from "../../components/homeFooter/HomeFooter";
import StayScroller from "../../components/stayScroller/StayScroller";

import { getRoomsInCountry } from "../../firebase";
import { GeoContext } from "../../context/Geolocation";



import "./home.css";

function Home() {
  const [rooms, setRooms] = useState([]);
  const { geoContext } = useContext(GeoContext);

  useEffect(() => {
    if (geoContext.country) {
      let roomsInCountry = getRoomsInCountry(
        geoContext.country.toLowerCase()
      ).then((rooms) => setRooms(rooms));
      // setRooms(roomsInCountry);
      console.log(rooms);
    };
    console.log(rooms)
  }, [geoContext.country]);

  useEffect(() =>{
    document.title = "Vacation Homes & Condo Rentals";
  },[]);

  return (
    <>


      <div className="home page-padding center">
        <StayScroller />
        {rooms.length !==0 && 
          <Destinations rooms={rooms} country={geoContext.country}/>
        }
        
      </div>
        <HomeFooter/>
    </>
  );
}

export default Home;
