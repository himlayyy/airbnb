import React, { useState } from "react";
import Slider from "react-slick";
import "./destinationItem.css";

import { IoHeartOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

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
        opacity: nextHovering ? 1 : 0.025,
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
        zIndex: 2,
        opacity: prevHovering ? 1 : 0.025,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

function DestinationItem() {
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
      <div className="destinationGal">
        <Slider {...settings}>
          <img
            className="destinationImg"
            src="https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg"
            alt="destImg1"
          />
          <img
            className="destinationImg"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/f4f7b242-db33-46fc-9080-c3d6a6fd55ec.jpeg"
            alt="destImg2"
          />
          {/* <img className = "destinationImg" src="https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/4756e699-f474-4ca7-8b77-06b12715a6cb.jpeg?im_w=720" alt="destImg3" />
          <img className = "destinationImg"  src="https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/fca892a4-3481-4ad1-9f92-404feaa42e9f.jpeg?im_w=720" alt="destImg4" />
          <img className = "destinationImg" src="https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/36d8007a-0de5-439d-9fec-1c2d7b53a147.jpeg?im_w=720" alt="destImg5" />
          <img className = "destinationImg" src="https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/f95b0a2e-0272-469e-a56c-433b9cc4ffdb.jpeg?im_w=720" alt="destImg6" /> */}
          {/* <div className="galBtns">
            <button className="galBtn" id="leftBtn">
              {`<`}
            </button>
            <button className="galBtn" id="rightBtn">
              {`>`}
            </button>
          </div> */}
        </Slider>
        <div className="galBtns">
          <button className="galBtn">
            <IoHeartOutline className="heartBtn" />
          </button>
        </div>
      </div>

      <div className="destinationDetails">
        <div className="destinationHeader">
          <span className="destinationName ">
            <a href="/" className="body-text">Destination Title</a>
          </span>
          <div className="destinationRating">
            <span className="ratingIcon">
            <AiFillStar />
            </span>
            <span className="ratingScore body-text">4.7</span>
          </div>
        </div>
        <div className="destinationDistance body-text light-text">
          In KMS         
        </div>
        <div className="destinationAvailability body-text light-text">Dates</div>
        <div className="destinationPrice body-text">
          <b>P38,485</b> night
        </div>
      </div>
    </div>
  );
}

export default DestinationItem;
