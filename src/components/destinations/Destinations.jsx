import React, { useEffect, useContext, useState } from "react";
import DestinationItem from "../destinationItem/DestinationItem";
import { getRoomsInCountry, batchWrite } from "../../firebase";
import { GeoContext } from "../../context/Geolocation";

import "./destinations.css";

function Destinations() {
  const [rooms, setRooms] = useState([]);
  const { geoContext } = useContext(GeoContext);

  useEffect(() => {
    if (geoContext.country) {
      console.log(geoContext.country.toLowerCase());
      let roomsInCountry = getRoomsInCountry(
        geoContext.country.toLowerCase()
      ).then((rooms) => setRooms(rooms));
      // setRooms(roomsInCountry);
      console.log(rooms);
    }
  }, [geoContext.country]);
 
  return (
    <>
      <div className="destinations">
        <div className="destinationItems">
          {console.log(rooms)}
          {rooms.length !==0 && rooms.map(({roomName,rating,roomPrice, id, images}) => {
            return <DestinationItem roomName={roomName} rating={rating}  price={roomPrice} id={id} country={geoContext.country} images={images}/>
          } )}
          
        </div>
      </div>
    </>
  );
}

export default Destinations;
