import axios from "axios";
import React, {useState, useEffect,  createContext} from "react";
import { parseItem } from "../helpers/helpers";

const GeoContext = createContext();  

function GeoContextProvider(props){     
    const [data, setData] = useState({
        country:"",
        currency:"",
        symbol: "",
        language: ""
    });

    const [geoContext, setGeoContext] = useState({});

    const [loading, setLoading] = useState(true);

    const updateContext = (arr) =>{
        const temp = {}
        arr.forEach(({key, value}) =>{return temp[key]= value});
        (
        setGeoContext((prevState) => ({...prevState, ...temp })
        )
        );
    };

    useEffect(() =>{

        let active = true;

        const  geocode = async (position) => {

            try{
                let location = await axios
                    .get(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth=554138311287701401525x115708`)
                    .then((res) => res.data.country);
            
                let res = await axios.get(`https://restcountries.com/v3.1/name/${location}?fields=name,currencies,languages`)
                .then((res) => res.data[0]);
            
                const {country, currency, language } = parseItem(res);

                if (active){
                    setData((prevState) => ({...prevState, country:country, currency:currency[0], symbol:currency[1], language:language}));
                    setLoading(!loading);
            };

            }catch(err){
                console.err(err);
            }  
        };

        if (!navigator.geolocation) {
            window.alert('Geolocation is not supported by your browser');
        } 
        else{
            navigator.geolocation.getCurrentPosition((position) => 
            {
                geocode(position);
            }
            );
        };
        return () => {
            active = false;
        };
    },[])

    useEffect(() => {
        if(!loading){
            setGeoContext({
                ...data,
            });
        };
    }, [loading]);
    
    return (
        <GeoContext.Provider value={{geoContext, updateContext}} >
           {props.children}
        </GeoContext.Provider>
    )
};

export {GeoContext, GeoContextProvider};