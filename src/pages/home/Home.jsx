import React, {useEffect} from "react";
import Header from "../../components/header/Header";
import Destinations from "../../components/destinations/Destinations";
import HomeFooter from "../../components/homeFooter/HomeFooter";
import StayScroller from "../../components/stayScroller/StayScroller";


import "./home.css";

function Home() {
  useEffect(() =>{
    document.title = "Vacation Homes & Condo Rentals";
  },[]);

  return (
    <>


      <div className="home page-padding center">
        <StayScroller />
        <Destinations/>
      </div>
        <HomeFooter/>
    </>
  );
}

export default Home;
