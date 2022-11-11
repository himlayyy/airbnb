import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
// import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Page2 from "./pages/page2/Page2";
import Login from "./pages/login/Login";

import './App.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {

  useEffect(() =>{
    document.title = "Airbnb";
  },[]);
  
  return (
     
    <div className="App">
      <Header />
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />}/>
          <Route path="/page-2" element={<Page2 />} />
          <Route path="/login" element={<Login/> } />
        </Routes>
    </div>
  );
}

export default App;
