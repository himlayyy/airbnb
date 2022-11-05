import React, { useState, useContext, useEffect, Suspense } from "react";
import Modal from "../modal/Modal";
import { countryCurrency } from "../../helpers/helpers";
import { GeoContext} from "../../context/Geolocation";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import "./accounttoggle.css";
import { MdAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";

function AccountToggle() {
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [modalOptions, setModalOptions] = useState();
  
  // const countryCurrencyParser = countryCurrency;
  const {geoContext, updateContext} = useContext(GeoContext);

  const navigate =  useNavigate();

  function Tab(name, options) {
    this.name = name;
    this.options = options;
  }

  function modalCallback(obj){
    console.log("IN modal calback!");
    console.log(obj);

    // updateContext({key:"currency", value:obj.currency.currency})

    updateContext([{key:"currency", value:obj.currency.currency},{key:"language", value:obj.language.language}]);

    // geolocation.currency = obj.currency.currecy

  }

  // console.log(geolocation)

  // const {data, loading, error} = useFetch(`https://restcountries.com/v3.1/name/${geolocation.country}?fields=name,languages,currencies`);

 
  useEffect(() => {

    const getCountryOptions = async () => {
      const endpoints = [
        `https://restcountries.com/v3.1/name/${geoContext.country}?fields=name,languages,currencies`,
        "https://restcountries.com/v3.1/all?fields=name,languages,currencies",
      ];
      let result;
      console.log("IN country");
      try {
        result = await axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then(
            axios.spread(({ data: current }, { data: countries }) => {
              return { countries, current };
            })
          );
      } catch (error) {
        console.log(error);
      }
      const parsed = await countryCurrency(result.countries, 50, result.current);

      // const currencyOptions = await parsed.map(
      //   ({ country, currency, symbol }) => ({
      //     country,
      //     currency,
      //     symbol
      //   })
      // );

      const currencyOptions = await parsed.map(
        (item) => {
          if (item.current){
            return {country: item.country, currency: item.currency, symbol: item.symbol, current: item.current} 
          }         
          else{
            return {country: item.country, currency: item.currency, symbol: item.symbol, current: false};
          }
        }
      );
      const currencyTab = new Tab("currency", currencyOptions);

      console.log(currencyTab);

      // const languageOptions = await parsed.map(() => ({
      //   country,
      //   language,
      //   current,
      // }));

      const languageOptions = await parsed.map((item) => {
        if(item.current){
          return {country: item.country, language: item.language, current: item.current}
        }
        else{ 
          return {country: item.country, language: item.language, current: false}
        }
      });

      const languageTab = new Tab("language", languageOptions);

      console.log(languageTab.options);

      // console.log("creating modal options....");
      // console.log(languageOptions);
      // console.log(currencyOptions);

      // console.log(Object.keys(languageOptions));
      // console.log(Object.keys(currencyOptions));

      setModalOptions([currencyTab, languageTab]);
      console.log("Modal options loaded!");
      setLoaded(() => !loaded);
    };

    if (openModal) {
      getCountryOptions();
    }

  }, [openModal]);

  return (
    <>
    
      <div className="rightHeaderGroup">
        <button className="hostBtn accountToggleHover">Become a Host</button>
        <button
          className="countryPicker accountToggleHover"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <FiGlobe size={"1.5em"} />
        </button>
        {/* <div className="accountContainer"> */}
        <button className="accountBtn" onClick={() => setClicked(!clicked)}>
          <div>
            <IoMenu size={"2em"} />
          </div>
          <div>
            <MdAccountCircle size={"2.5em"} />
          </div>
        </button>
        {/* {console.log(countryCurrency)} */}
        {clicked && (
          <div className="accountDetails">
            <>
              <div className="accountSignUp accountToggleHover bold-text" onClick={()=> navigate("/login")}>
                Sign Up
              </div>
              <div className="accountLogIn accountToggleHover" onClick={()=> navigate("/login")}>Log In </div>
              <div className="thin-separator"></div>
              <div className="hostHome accountToggleHover">Host your home</div>
              <div className="hostExperience accountToggleHover">
                Host an experience
              </div>
              <div className="help accountToggleHover">Help</div>
            </>
          </div>
        )}
        
        {openModal && modalOptions && (
              <Modal
                modalContents={modalOptions}
                openModal={setOpenModal}
                optionType={"radio"}
                prompt={"Choose a "}
                modalCallback={modalCallback}
              />          
        )}

        {/* {openModal && (          
          <Suspense fallback={<div>Loading</div>}>
            {modalOptions && (
              <Modal
                modalContents={modalOptions}
                openModal={setOpenModal}
                optionType={"radio"}
                prompt={"Choose a "}
              />
            )}
          </Suspense>
        )} */}

        
      </div>
    </>
  );
}

export default AccountToggle;
