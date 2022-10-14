import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
// import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Page2 from "./pages/page2/Page2";

import './App.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  
  return (
     
    <div className="App">
      <Header />
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="/s" element={<SearchResult />}>
            Page 2
          </Route>
          <Route path="/page-2" element={<Page2 />}>
            Page 3
          </Route>
        </Routes>
    </div>
  );
}

export default App;
