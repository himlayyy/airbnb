import React, { useState, useContext, useEffect, Suspense } from "react";
import Modal from "../modal/Modal";
import { countryCurrency } from "../../helpers/helpers";
import { GeoContext} from "../../context/Geolocation";
import { useNavigate } from "react-router-dom";
import Portal from "../Portal";

import useFetch from "../../hooks/useFetch";
import axios from "axios";

import "./accounttoggle.css";
import { MdAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";
import { auth, logOut } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function AccountToggle() {
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);

  const [modalOptions, setModalOptions] = useState();
  
  // const countryCurrencyParser = countryCurrency;
  const {data, geoContext, updateContext} = useContext(GeoContext);

  const navigate =  useNavigate();
  const [user, loading, error] = useAuthState(auth);

  function Tab(name, options) {
    this.name = name;
    this.options = options;
  }

  function modalCallback(obj){
    console.log("IN modal calback!");
    console.log(obj);

    // updateContext({key:"currency", value:obj.currency.currency})

    updateContext([{key:"currency", value:obj.currency.currency},
                  {key:"symbol", value:obj.currency.symbol},
                  {key:"language", value:obj.language.language}]);

    // geolocation.currency = obj.currency.currecy

  }

  // console.log(geolocation)

  // const {data, loading, error} = useFetch(`https://restcountries.com/v3.1/name/${geolocation.country}?fields=name,languages,currencies`);
  
 
  useEffect(() => {
    let toggled = true;

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

      const languageOptions = await parsed.map((item) => {
        if(item.current){
          return {country: item.country, language: item.language, current: item.current}
        }
        else{ 
          return {country: item.country, language: item.language, current: false}
        }
      });

      const languageTab = new Tab("language", languageOptions);
      
      if(toggled){
        setModalOptions([currencyTab, languageTab]);
        setLoaded(() => !loaded);
      }
    };

    if (openModal) {
      getCountryOptions();
    }
    return () =>{
      toggled = false;

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
        <button className="accountBtn"
          onClick={() => setClicked(!clicked)}> 
          <div> 
            <IoMenu size={"2em"} /> 
          </div> 
          <div> 
            <MdAccountCircle size={"2.5em"} /> 
          </div>
          </button>
          {clicked && ( 
          <div className="accountDetails"> <> 
          {user === null ? (
            <>
              <div className="accountSignUp accountToggleHover bold-text" 
              onClick={()=> { 
              setClicked(!clicked);
              navigate("/signup");}
              }>
              Sign Up
            </div>
            <div className="accountLogIn accountToggleHover" onClick={()=> {
              setClicked(!clicked);   
              navigate("/login");}}>
              Log In 
            </div>
          </>) : 
          (<>
            <div className="accountSignOut accountToggleHover"  onClick = {() => setOpenPortal(!openPortal)}>
              Sign out
            </div>
          </>)}
            <div className="thin-separator"></div>
            <div className="hostHome accountToggleHover">Host your home</div>
            <div className="hostExperience accountToggleHover">
              Host an experience
            </div>
            <div className="help accountToggleHover">Help</div>
            </>
          </div>
          )}

          {openPortal && (
              <Portal handleClose={() => {
                setClicked(!clicked);
                setOpenPortal(!openPortal)}} 
                openPortal={openPortal}
                containerClass={"auth-confirmation"}>
                  <h4>Are you sure you want to sign out?</h4>
                  <button className="buttonBottom"
                  onClick={() => {
                      logOut();
                      setClicked(!clicked);
                      setOpenPortal(!openPortal);
                      navigate("/");
                  }}>Sign out</button>
              </Portal>
            )
          }

        {openModal && (          
          <Suspense fallback={<div>Loading</div>}>
            {modalOptions && (
              <Modal
                modalContents={modalOptions}
                openModal={setOpenModal}
                optionType={"radio"}
                prompt={"Choose a "}
                modalCallback={modalCallback}
              />       
            )}
          </Suspense>
        )}

        
      </div>
    </>
  );
}

export default AccountToggle;
