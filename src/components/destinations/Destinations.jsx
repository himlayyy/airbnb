import React, { useEffect, useContext, useState } from "react";
import DestinationItem from "../destinationItem/DestinationItem";
import { getRoomsInCountry, batchWrite } from "../../firebase";
import { GeoContext } from "../../context/Geolocation";


import { v4 as uuidv4 } from 'uuid';

import "./destinations.css";

function Destinations({rooms, country}) {
 
  return (
    <>
      <div className="destinations">
        <div className="destinationItems">
          {rooms.length !==0 && rooms.map(({roomName,rating,roomPrice, id, images}) => {
            return <DestinationItem roomName={roomName} rating={rating}  price={roomPrice} id={id} country={country} images={images} key={uuidv4()}/>
          } )}
        </div>
      </div>
    </>
  );
}

export default Destinations;
