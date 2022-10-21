// import "./wdyr";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GeoContextProvider } from "./context/Geolocation";
import { SearchContextProvider } from "./context/SearchContext";
import "mapbox-gl/dist/mapbox-gl.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeoContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchContextProvider>
    </GeoContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
