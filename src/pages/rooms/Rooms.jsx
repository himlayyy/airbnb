import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillStar } from "react-icons/ai";
import { IoHeartOutline, IoShareOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import {
  MdOutlineKingBed,
  MdOutlineSingleBed,
  MdOutlineBed,
} from "react-icons/md";

import { IoSearchSharp } from "react-icons/io5";
import { format, eachDayOfInterval, differenceInDays, } from "date-fns";

import Portal from "../../components/Portal";

import { formatGuests } from "../../helpers/helpers";
import { getRoomInCountry, bookStay } from "../../firebase";
import { GeoContext } from "../../context/Geolocation";

import ExpandedDates from "../../components/expandedSearch/ExpandedDates";
import ExpandedGuests from "../../components/expandedSearch/ExpandedGuests";

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
};

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
};

function Rooms() {
  const [details, setDetails] = useState({});
  const [clicked, setClicked] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const [stayDates, setStayDates] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [noOfDaysStaying, setNoOfDaysStaying] = useState(0);
  const [stayCost, setStayCost] = useState(0);
  const [guestsStaying, setGuestsStaying] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [maxGuests, setMaxGuests] = useState(0);

  const [user] = useAuthState(auth)

  const params = useParams();
  const navigate = useNavigate();
  const geoContext = useContext(GeoContext);

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

  const bedTypeSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleSelectedDates = ({ startDate, endDate }) => {
    setStayDates({ startDate: startDate, endDate: endDate });
    setNoOfDaysStaying(() => differenceInDays(endDate, startDate));
  };

  const handleSelectedGuests = (guests) => {
    setGuestsStaying(() => guests);
  };

  const handleBookStay = () => {
    if (user) {
      if (Object.values(stayDates).length === 0 || Object.values(guestsStaying).length === 0) {
        console.log("incomplete booking details");
      } else {
        bookStay({
          country: params.country.toLowerCase(),
          stayId: params.id,
          stayDates: stayDates,
          stayCost: stayCost,
          noOfDaysStaying: noOfDaysStaying,
          guestsStaying: guestsStaying,

        }, user.uid);
        setConfirmBooking(!confirmBooking);
      }
    } else {
      console.log("Log-in or create an account to book a stay");
      setOpenPortal(!openPortal);
      setShowLogin(!showLogin);
    }
  };

  useEffect(() => {
    getRoomInCountry(params.country.toLowerCase(), params.id).then((data) => { setDetails(data) });
    console.log("geocontext");
    console.log(geoContext);
  }, []);

  useEffect(() => {
    const formatDate = (dates) => {
      let dateObj = {}
      dateObj["startDate"] = format((new Date(dates["startDate"].seconds * 1000)), "MMM d yyyy");
      dateObj["endDate"] = format((new Date(dates["endDate"].seconds * 1000)), "MMM d yyyy");
      return dateObj;
    };
    const convertToDate = (startDate, endDate) => {
      setDisabledDates(eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) }));
    };

    document.title = details.roomName;
    if (details.hasOwnProperty("bookings")) {
      const dates = formatDate(details.bookings[0]);
      convertToDate(dates.startDate, dates.endDate);
    };
    if (details.hasOwnProperty("beds")) {
      setMaxGuests(details.beds);
    }
    else {
      setMaxGuests(details.guests);
    };
    setStayCost(() => details.roomPrice * 1);
  }, [details]);

  return (
    <div className="roomsPage page-padding">
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
                  <a className="reviews body-text">{details.reviews} Reviews</a>
                  {details?.location && <div className="destinationLocation">{details.location[0].address}</div>}
                  {/**/}
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
              {details?.images?.slice(0, 5).map((url, i) =>
                <img
                  className="destinationImg"
                  src={url}
                  alt={`altImg${i + 1}`}
                />)
              }
              <button onClick={() => { setOpenPortal(!openPortal); setShowGallery(!showGallery) }}>
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
                    {details.guests && <><li>{details.guests} guests</li><hr /></>}
                    {details.bedrooms && <><li>{details?.bedrooms} bedrooms</li><hr /></>}
                    {details.guests && <><li>{details?.guests} guests</li><hr /></>}
                    {details.beds && <><li>{details?.beds} beds</li><hr /></>}
                    {details.baths && <><li>{details?.baths} baths</li></>}
                  </ul>
                </div>
                <div className="subheading-right">
                  {/*<img src={details.hostPic} className="hostPic" />*/}
                  <img src={details.hostPic} alt={`${details.hostName}-pic`} className="hostPic" />
                </div>
              </div>

              {details?.mainDescription && (
                <div className="room-details">
                  <p>{details.mainDescription}</p>
                </div>)}

              {details?.bedroomTypes && (<div className="room-details roomType-scroller">
                {Object.values(details.bedroomTypes).length < bedTypeSettings.slidesToShow ?
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
                  <Slider {...bedTypeSettings}>
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
                <div className="bookings-header">
                  <span className="roomPrice">{`${geoContext.geoContext.symbol}${details.roomPrice} night`}</span>
                  <span className="ratingScore body-text">
                    <div className="destinationRating">
                    <span className="ratingIcon">
                      <AiFillStar />
                    </span>
                    <span className="ratingScore body-text">
                      {details.rating}
                    </span>
                  </div>
                  </span>
                  <a className="reviews">{details.reviews} Reviews</a>
                </div>
                <div className="searchOptionsContainer">
                  <div className="searchOptions">
                    <ExpandedDates disabledDates={disabledDates} callback={handleSelectedDates}
                    />
                    <ExpandedGuests maxGuests={maxGuests} callback={handleSelectedGuests} />
                  </div>
                  <div
                    className="searchItem searchOption searchButton pointer button_effect"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookStay();
                    }}
                  >
                    <IoSearchSharp size={"1.5em"} />
                    <span className="body-text">Book</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showGallery && (
        <Portal handleClose={() => {
          setClicked(!clicked);
          setShowGallery(!showGallery);
        }} openPortal={openPortal}>
          <div className="roomGallery-all">
            <div className="roomGallery-all-container">
              {details.images.map((image, i) => <img
                className="destinationImg"
                src={image}
                alt={`altImg${i + 1}`}
              />)}
            </div>
          </div>

        </Portal>
      )
      }
      {showLogin && (
        <Portal handleClose={() => {
          setClicked(!clicked);
          setShowLogin(!showLogin);
        }} openPortal={openPortal}>

          <h4>Log-in or sign-up to book a stay</h4>
          <button className="buttonBottom"
            onClick={() => {
              setClicked(!clicked);
              setOpenPortal(!openPortal);
              navigate("/login");
            }}>Login</button>
          <button className="buttonBottom"
            onClick={() => {

              setClicked(!clicked);
              setOpenPortal(!openPortal);
              navigate("/signup");
            }}>Sign-up</button>
        </Portal>
      )}
      {confirmBooking && (
        <Portal handleClose={() => {
          setClicked(!clicked);
          navigate("/");
          ;
        }}
          openPortal={openPortal}
          containerClass={"booking-confirmation"}>
          <h4>Stay booked!</h4>
          <div>
            <ul>
              <li><b>Details</b></li>
              <li>Stay: {details.roomName}</li>
              <li>Country: {params.country} </li>
              <li><b>From:</b> {format(stayDates["startDate"], "PPPP")} to {format(stayDates["endDate"], "PPPP")}</li>
              <li><b>Duration:</b> {noOfDaysStaying} </li>
              <li>{formatGuests(guestsStaying)} guests for {stayCost}</li>
            </ul>
          </div>
          <button className="buttonBottom"
            onClick={() => {
              setClicked(!clicked);
              setOpenPortal(!openPortal);
              navigate("/");
            }}>Okay</button>
        </Portal>)}
    </div>
  );

}

export default Rooms;
