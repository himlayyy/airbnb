import React from "react";
import { Routes, Route} from "react-router-dom";
import Header from "../header/Header";
import Home from "../../pages/home/Home";
import Page1 from "../../pages/page1/Page1";
import Page2 from "../../pages/page2/Page2";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import MailList from "../maillist/MailList";
import { GeoContextProvider } from "../../context/Geolocation";


function AppRouter() {
  return (
    <>
    {/* <GeoContextProvider > */}
      <Header />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="/page-1" element={<Page1 />}>
            Page 2
          </Route>
          <Route path="/page-2" element={<Page2 />}>
            Page 3
          </Route>
        </Routes>
      {/* <MailList/>
      <Footer /> */}
      {/* </ GeoContextProvider> */}
    </>
  );
}

export default AppRouter;
