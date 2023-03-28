import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { v4 as uuidv4 } from 'uuid';

import "./destinationItem.css";

import { IoHeartOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

import { GeoContext } from "../../context/Geolocation";

function NextArrow(props) {
  const [nextHovering, setNextHovering] = useState(false);
  const { className, style, onClick } = props;



  const handleMouseEnter = () => {
    setNextHovering(true);
  };
  const handleMouseLeave = () => {
    setNextHovering(false);
  };

  return (

    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        right: "5px",
        zIndex: 2,
        backgroundColor: "transparent !important",
        borderRadius: "50%",
        opacity: nextHovering ? 1 : 0.5,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
     />
    
  );
}

function PrevArrow(props) {
  const [prevHovering, setPrevHovering] = useState(false);
  const { className, style, onClick } = props;

  const handleMouseEnter = () => {
    setPrevHovering(true);
  };
  const handleMouseLeave = () => {
    setPrevHovering(false);
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        left: "5px",
        backgroundColor: "transparent !important",
        borderRadius: "50%",
        zIndex: 2,
        opacity: prevHovering ? 1 : 0.5,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

function DestinationItem({id, country, images, roomName="roomName", rating=3, price=400
}) {

   const{geoContext} = useContext(GeoContext);  


  const navigate =  useNavigate();

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // dotsClass: "dot-style slick-dots "
  };



  
  return (
    <div className="destinationItem">
      <div className="destinationGal" id={id}>
        {images?.length > 1 ? 
        (<>
          <Slider {...settings}>
                    {images.map((image,i) => <img
                        className="destinationImg"
                        src= {image}
                        key={uuidv4()}
                        alt={`destAltImg${i+1}`} />
                    )}
          </Slider>
          <div className="galBtns">
            <button className="galBtn">
              <IoHeartOutline className="heartBtn" />
            </button>
          </div>
          </>
        )
        :
        (<img className="destinationImg lazyLoad"
              src= {images[0]}
              key={uuidv4()}
              alt={`destAltImg${1}`} />) }
      </div>

      <div className="destinationDetails">
        <div className="destinationHeader">
          <span className="destinationName " onClick={() => navigate(`/rooms/${country.toLowerCase()}/${id}`)} >

     {roomName}
          </span>
          <div className="destinationRating">
            <span className="ratingIcon">
            <AiFillStar />
            </span>
            <span className="ratingScore body-text">{rating}</span>
          </div>
        </div>
        <div className="destinationPrice body-text">
          <b>{geoContext.symbol}{price} /night</b> 
        </div>
      </div>
    </div>
  );
}

export default DestinationItem;



