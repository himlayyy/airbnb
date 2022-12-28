import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
// import Page2 from "./pages/page2/Page2";
import SignUp from "./pages/authform/signup/SignUp";
import Login from "./pages/authform/login/Login";
import Rooms from "./pages/rooms/Rooms";

import './App.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  
  return (
     
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />}/>
          {/* <Route path="/page-2" element={<Page2 />} /> */}
          <Route path="/login" element={<Login/> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
    </div>
  );
}

export default App;
