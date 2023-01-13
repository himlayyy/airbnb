import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IoHeartOutline, IoShareOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import {
  MdOutlineKingBed,
  MdOutlineSingleBed,
  MdOutlineBed,
  MdOutlineMicrowave,
} from "react-icons/md";
import { GiForkKnifeSpoon, GiComb } from "react-icons/gi";
import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
// import { IoWaterOutline } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io";
import { TbHanger } from "react-icons/tb";
import { MdIron } from "react-icons/md";

// src\components\searchbar\SearchBar.jsx
// src\pages\rooms\Rooms.jsx

import Portal from "../../components/Portal";

import { amenitiesIcons, amenitiesLabel } from "../../helpers/helpers";
import { getRoomInCountry } from "../../firebase";

import SearchBar from "../../components/searchbar/SearchBar";
import ExpandedSearch from "../../components/expandedSearch/ExpandedSearch";
import Slider from "react-slick";

import "./rooms.css";

let slidesToShow;

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <>
      <div
        className={className}
        style={{
          ...style,
          cursor: "pointer",
          backgroundColor: "black",
        }}
        onClick={onClick}
      ></div>
    </>
  );
}

function PrevArrow(props) {
  const { className, style, onClick, slideCount, currentSlide } = props;

  return (
    <>
      {currentSlide !== slideCount - slidesToShow && (
        <div
          className={className}
          style={{
            ...style,
            cursor: "pointer",
            backgroundColor: "black",
          }}
          onClick={onClick}
        ></div>
      )}
    </>
  );
}

function Rooms() {
  // const [details, setDetails] = useState({
  //   roomName: "9 double bedroom luxury villa with infinity pool",
  //   rating: 4.97,
  //   reviews: 144,
  //   location: "Malay, Western Visayas, Philippines",
  //   roomPrice: 54950,
  //   currency: "PHP",
  //   roomType: "Entire home",
  //   host: "Rinaldo",
  //   hostPic:
  //     "https://a0.muscache.com/im/pictures/user/bcdf359a-cbbf-4530-996b-ed8646baf340.jpg",
  //   superhost: true,
  //   guests: 16,
  //   bedrooms: 9,
  //   beds: 11,
  //   baths: 10.5,
  //   bedroomTypes: [
  //     {
  //       type: "Bedroom",
  //       beds: { King: 1, Queen: 1 },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         Queen: 1,
  //         Single: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         Double: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         Single: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //     {
  //       type: "Bedroom",
  //       beds: {
  //         King: 1,
  //       },
  //       bedName: "bed",
  //     },
  //   ],
  //   amenities: [
  //     "Kitchen",
  //     "Free parking on premises",
  //     "TV",
  //     "Patio or balcony",
  //     "Luggage dropoff allowed",
  //     "Wifi",
  //     "Pool",
  //     "Air conditioning",
  //     "Backyard",
  //     "Crib",
  //     "Microwave",
  //     "Hot water",
  //   ],
  //   mainDescription:
  //     "We are very happy to offer a large luxury 9 double bedroom (with en-suite) villa which comfortably sleeps a total of 19 people. The house comes with a team of 5 staff plus a van and driver at your disposal throughout your stay and included in the nightly rate. The house and pool is all exclusively yours giving you total privacy.",
  //   additionalDescription: {
  //     "The space": `The villa (Kalamansi House) is perched high on a hilltop giving it fabulous far reaching views across Boracay, Panay and the ocean. It is made up of a car port in the basement with table tennis table; a very spacious living area on the ground floor with open plan kitchen, living room and TV nook surrounded by large openings onto equally spacious outdoor areas which include al fresco dining with bbq area, bar and cabana, sunken seating area plus 18mt infinity pool; 5 double bedrooms with en suites on the first floor; two double bedrooms with en suites plus a billiard room on the second (top) floor. We have two more double bedrooms with en-suite just off the car port area making 9 bedrooms.

  //     The house is south west facing thus benefiting from fabulous sunshine throughout the day ending with the famous Boracay sunsets. It also benefits from a good breeze most of the year. The ground floor also has a good HIFI sound system with 16 speakers.
      
  //     To compliment the house we have a great team made up of 3 girls and two boys who are keen to make your holiday as seamless and pleasurable as possible. They will help with shopping for groceries and with cooking and tidying up. They will also make your room up when convenient for you. We keep a stock of basic soft and alcoholic drinks which you can have at cost. We have a van and driver at your disposal 24/7; from 8am to 12 midnight it's included in the nightly rate and between midnight and 8am it's PHP500 per trip. Please note the van is only for the use of guests staying in the house.
      
  //     All the bedrooms have aircon plus wifi and cable TV with numerous HD channels. We have a generator to take care of the occasional power blackouts. Each bedroom will be made up for you at your convenience with new towels every day. We also supply shampoo and soap as well as a hair dryer. Each room has sliding doors onto an outside terrace.
      
  //     The house is situated in a residential area which is 10 minutes van ride from all the action on White Beach.`,
  //     "Guest acces":
  //       "The house is totally private and only for the guests - there are no shared areas.",
  //   },
  // });

  const [details, setDetails] = useState({});
  const [clicked, setClicked] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const params = useParams();

  const stringifyRooms = (bedroom) => {
    let arr = [];
    Object.entries(bedroom.beds).map((beds) => {
      arr.push(`${beds[1]} ${beds[0]} ${bedroom.bedName}`);
    });
    return arr.toString();
  };

  const roomIcons = (room) => {
    switch (room) {
      case "King":
        return <MdOutlineKingBed />;
        break;
      case "Queen":
        return <MdOutlineSingleBed />;
        break;
      case "Single":
      case "Double":
        return <MdOutlineBed />;
        break;
      default:
        return null;
    }
  };

  // const amenity;

  // const roomIcons = () => {return <>Hello!!!</>}
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 14,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 1050,
    //     settings: {
    //       slidesToShow: 13,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 1000,
    //     settings: {
    //       slidesToShow: 12,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 11,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 800,
    //     settings: {
    //       slidesToShow: 10,
    //       slidesToScroll: 3,
    //       initialSlide: 1
    //     }
    //   },
    //   {
    //     breakpoint: 700,
    //     settings: {
    //       slidesToShow: 9,
    //       slidesToScroll: 9,
    //       initialSlide: 1
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 8,
    //       slidesToScroll: 8,
    //       initialSlide: 1
    //     }
    //   },
    //   {
    //     breakpoint: 500,
    //     settings: {
    //       slidesToShow: 5,
    //       slidesToScroll: 5,
    //       initialSlide: 1
    //     }
    //   },
    //   {
    //     breakpoint: 400,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 4
    //     }
    //   }
    // ]
  };

  useEffect(() => {
    console.log("in rooms page");
    getRoomInCountry(params.country.toLowerCase(), params.id).then((data) => {console.log(data);setDetails(data);});
    document.title = details.roomName;
    console.log(details);
  }, []);

  return (
    <div className="roomsPage page-padding">
      {/* {stringifyRooms()} */}
      {console.log(details)}
      <div className="roomsContainer">
        <div className="roomsDetails">
          <div className="roomsDetails-heading">
            <div className="roomsDetails-heading-container">
            <h2 className="roomName">{details.roomName}</h2>
            <div className="roomDetails-subheading">
              <div className="subheading-left">
                <div className="destinationRating">
                  <span className="ratingIcon">
                    <AiFillStar />
                  </span>
                  <span className="ratingScore body-text">
                    {details.rating}
                  </span>
                </div>
                <a className="reviews">{details.reviews} Reviews</a>
                <div className="destinationLocation">{details.location}</div>
              </div>
              <div className="subheading-right">
                <button>
                  <IoShareOutline />
                  Share
                </button>
                <button className="galBtn">
                  <IoHeartOutline />
                  Save
                </button>
              </div>
            </div>
            </div>
            <div className="roomGallery">
              {console.log()}
              {details?.images?.slice(0,5).map((url,i) => 
                  <img
                    className="destinationImg"
                    src={url}
                    alt={`altImg${i+1}`}
                  />
                )
              }
              {console.log(details.images)}
              <button onClick = {() => setOpenPortal(!openPortal)}>
                <TbGridDots />
                Show all photos
              </button>
            </div>
          </div>
          <div className="roomDetails-details-container">
            <div className="roomsDetails-lists">
              <div className="room-details">
                <div className="subheading-left">
                  <h3>
                    {details.roomType} by {details.hostFirstName}
                  </h3>
                  <ul>
                    {details.guests && <><li>{details.guests} guests</li><hr/></>}
                    {details.bedrooms  && <><li>{details?.bedrooms} bedrooms</li><hr/></>}
                    {details.guests && <><li>{details?.guests} guests</li><hr/></>}
                    {details.beds && <><li>{details?.beds} beds</li><hr/></>}
                    {details.baths && <><li>{details?.baths} baths</li></>}
                  </ul>
                </div>
                <div className="subheading-right">
                  {/*<img src={details.hostPic} className="hostPic" />*/}
                  <img src="https://a0.muscache.com/im/pictures/user/bcdf359a-cbbf-4530-996b-ed8646baf340.jpg?im_w=240" className="hostPic" />

                </div>
              </div>

              {details?.mainDescription && (
                <div className="room-details">
                  <p>{details.mainDescription}</p>
                </div>)}

{/* roomIcons(bed)   */}
              
              {details?.bedroomTypes  && (<div className="room-details roomType-scroller">
                {Object.values(details.bedroomTypes).length < settings.slidesToShow ?
                 ( 
                  Object.values(details.bedroomTypes).map((bedroom, i) => 
                    <>
                      <div className="slideItem roomType-slideItem">
                        <span> {Object.keys(bedroom.beds).map((bed) => 
                          roomIcons(bed)
                          

                        )}</span>
                        <h4>{bedroom.type} {i + 1}</h4>
                        
                        <span>{stringifyRooms(bedroom)}</span>
                      </div>
                     </>
                  )
                 )
                  :
                  <Slider {...settings}> 
                     {Object.values(details.bedroomTypes).map((bedroom, i) => 
                      <>
                        <div className="slideItem roomType-slideItem">
                          <span> {Object.keys(bedroom.beds).map((bed) => 
                            roomIcons(bed)
                            

                          )}</span>
                          <h4>{bedroom.type} {i + 1}</h4>
                          
                          <span>{stringifyRooms(bedroom)}</span>
                        </div>
                       </>
                    )}
                  </Slider>
                }
                 </div>)
               }
              <div className="room-details amenities">
                <h3>What this place offers you</h3>
                <ul>
                  {details?.amenities?.map((amenity) => (
                    <>
                      <li className="amenity">{amenity}</li>
                    </>
                  ))}
                </ul>
              </div>
            </div>

            <div className="roomsDetails-booking">
              <div className="roomsDetails-booking-container">
                Book
                {details.roomPrice}
                <ExpandedSearch />
                 {/*<AccountToggle /> */}
                
                <MdOutlineBed size={"32px"} />
                <MdOutlineSingleBed size={"32px"} />
                <MdOutlineKingBed size={"32px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
       {openPortal && (
            <Portal handleClose={() => {
              setClicked(!clicked);
              setOpenPortal(!openPortal);}} openPortal={openPortal}>
              <div className="roomGallery-all">
                <div className="roomGallery-all-container">
                  {details.images.map((image, i) => <img
                      className="destinationImg"
                      src={image}
                      alt={`altImg${i+1}`}
                    />)}
                </div>
              </div>

            </Portal>
          )
        }
    </div>
    
    //</div>
    // </div>
  );
}

export default Rooms;
