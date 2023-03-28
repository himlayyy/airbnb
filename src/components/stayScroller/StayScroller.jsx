import React from "react";
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';
import "./stayscroller.css";
import StayFilter from "../stayFilter/StayFilter";

import {CgChevronLeftO} from "react-icons/cg";
import {
  GiMountainRoad,
  GiIsland,
  GiCastle,
  GiWhiteTower,
} from "react-icons/gi";
import {
  FaSnowflake,
  FaPlaneDeparture,
  FaUmbrellaBeach,
  FaSpa,
  FaTrain,
  FaTrailer,
  FaSkiing,
  FaPalette,
} from "react-icons/fa";
import {
  MdBackpack,
  MdCabin,
  MdSurfing,
  MdOutlineSportsGolf,
  MdOutlineCoffee,
} from "react-icons/md";
import { TbTent, TbSailboat } from "react-icons/tb";

let slidesToShow;

function NextArrow(props) {
  const { className, style, onClick} = props;

  return (
    <>
 
      <div
        className={className}
        style={{
          ...style,
          cursor:"pointer",
          backgroundColor:"black"
        }}
        onClick={onClick}
        >
          </div>
  
    </>
  );
}

function PrevArrow(props) {
  const { className, style, onClick, slideCount, currentSlide } = props;

  return (
    <>
    {currentSlide !== slideCount - slidesToShow &&
      (
      <div
        className={className}
        style={{
          ...style,
          cursor:"pointer",
          backgroundColor:"black"
        }}
        onClick={onClick}
        >
      </div>
       )
    }
      </>
  );
}
function StayScroller() {

  
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 17,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 14,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 13,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 12,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 11,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 3,
          initialSlide: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 9,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          initialSlide: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]

  };

  const menuItems = [
    "National parks",
    "Arctic",
    "Hostel",
    "Airport",
    "Train",
    "Resort",
    "Spa",
    "Cabin",
    "Island",
    "Camping",
    "Surfing",
    "Golf",
    "Castle",
    "Camper",
    "Bed & breakfast",
    "Boat",
    "Skiing",
    "Art venue",
    "Towers",
  ];
  const menuIcons = [
    GiMountainRoad,
    FaSnowflake,
    MdBackpack,
    FaPlaneDeparture,
    FaTrain,
    FaUmbrellaBeach,
    FaSpa,
    MdCabin,
    GiIsland,
    TbTent,
    MdSurfing,
    MdOutlineSportsGolf,
    GiCastle,
    FaTrailer,
    MdOutlineCoffee,
    TbSailboat,
    FaSkiing,
    FaPalette,
    GiWhiteTower,
  ];

  
  return (
    
    <>
      <div className="stay">
        <div className="sliderContainer" key={uuidv4()}>
          <Slider {...settings}>
            {menuItems.map((menuItem, idx) => {
              const Icon = menuIcons[idx];
              return (
                <>
                  <div className="slideItem"
                  key={uuidv4()}
                  >
                    <Icon className="slideIcon" size={'1.5em'}/>
                    <p className="slideTitle">{menuItem}</p>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
        <StayFilter />
      </div>
    </>
  );
}

export default StayScroller;
