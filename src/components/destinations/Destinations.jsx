import React, { useEffect, useContext, useState } from "react";
import DestinationItem from "../destinationItem/DestinationItem";
import { getRoomsInCountry, batchWrite } from "../../firebase";
import { GeoContext } from "../../context/Geolocation";

import "./destinations.css";

function Destinations({rooms, country}) {
 
  return (
    <>
      <div className="destinations">
        <div className="destinationItems">
          {console.log(rooms)}
          {rooms.length !==0 && rooms.map(({roomName,rating,roomPrice, id, images}) => {
            return <DestinationItem roomName={roomName} rating={rating}  price={roomPrice} id={id} country={country} images={images}/>
          } )}
          
        </div>
      </div>
    </>
  );
}

export default Destinations;
