import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";

import './App.css';


import AppRouter from './components/approuter/AppRouter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  
  return (
     
    <div className="App">
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
    </div>
  );
}

export default App;
