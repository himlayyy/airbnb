import React from "react";

import { AiFillStar } from "react-icons/ai";
import { IoHeartOutline, IoShareOutline } from "react-icons/io5";

import "./rooms.css";

function Rooms() {
  return (
    <div className="roomsPage page-padding">
      <div className="roomsContainer">
        <div className="roomsDetails">
          <div className="roomsDetails-heading">
            <h3 className="roomName">Room Name</h3>
            <div className="roomDetails-subheading">
              <div className="subheading-left">
                <div className="destinationRating">
                  <span className="ratingIcon">
                    <AiFillStar />
                  </span>
                  <span className="ratingScore body-text">4.7</span>
                </div>
                <a className="reviews">
                  Reviews
                </a>
                <div className="destinationLocation">Location</div>
              </div>
              <div className="subheading-right">
                <button>
                  <IoShareOutline />Share
                </button>
                <button className="galBtn">
                  <IoHeartOutline/>
                  Save
                </button>
              </div>
            </div>
            <div className="roomGallery">Gallery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
