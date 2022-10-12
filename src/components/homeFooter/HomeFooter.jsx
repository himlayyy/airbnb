import React, { useState, useEffect, useContext } from "react";
import "./homefooter.css";
import { FiGlobe } from "react-icons/fi";
import { GeoContext } from "../../context/Geolocation";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function HomeFooter() {
  // src\components\homeFooter\HomeFooter.jsx
  const{ geoContext} = useContext(GeoContext);
  // const {geoState, setGeoState} = useState({});
  // const {geolocation, callback} = geoContext;

  // console.log(geolocation)

  // const {geolocation, loading, error} = fetch("https://api.ipify.org?format=jsonp&callback=getip");
  // const [details, setDetails] = useState(null);

  // const {data, loading, error} = useFetch("http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query");

//   useEffect(() => {
// setGeoState({...geoContext});
// console.log(geoState)
//   }, [])

//   useEffect(() =>{    
//     const update = (val) => {
//       setGeoState((prevVal) =>( {...prevVal, ...val}));

//     };
//     console.log(geoState)
//   }, [geoContext])

 return (
    
    <div className="page-padding homeFooter">
      <div className="homeFooterContainer">
        <div className="footerGroup">
          <ul>
            <li>

              <button className="footerBtn">2022 Airbnb, Inc</button>
            </li>
            <hr />
            <li>
              <button className="footerBtn">Privacy</button>
            </li>
            <hr />
            <li>
              <button className="footerBtn">Terms</button>
            </li>
            <hr />
            <li>
              <button className="footerBtn">Sitemap</button>
            </li>
            <hr />
            <li>
              <button className="footerBtn">Destinations</button>
            </li>
          </ul>
        </div>
          <div className="footerGroup">
            <div className="location">
              <span className="locationIcon">
                <FiGlobe className="globeBtn" />
              </span>
              {/* <span className="locationLanguage">English</span> */}
              <span className="languageCode">{"language" in geoContext ? `${geoContext.language}` : "English"}</span>
            </div>
            <div className="currency">
              <span className="currency">{geoContext.currency}</span>  
            </div>
            <div className="support">Support and resources</div>
          </div>

      </div>
      
    </div>
  );
}

export default HomeFooter;
