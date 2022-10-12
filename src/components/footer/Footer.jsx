import React from "react";
import "./footer.css";

function Footer() {
  const footerItems = [
    "Countries",
    "Regions",
    "Cities",
    "Districts",
    "Airports",
    "Hotels",
  ];
  return (
    <footer>
      <div className="footerCol">
        {footerItems.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
      <div className="footerCol">
        {footerItems.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
      <div className="footerCol">
        {footerItems.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
      <div className="footerCol">
        {footerItems.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
     
    </footer>
  );
}

export default Footer;
