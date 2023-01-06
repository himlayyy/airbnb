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
                // Reverse geocode to get current country
                
                // let location = await axios
                //     .get(`http://api.positionstack.com/v1/reverse?access_key=230b2be842e46ac2b0d069089d87009d&query=${position.coords.latitude},${position.coords.longitude}&limit=1`)
                //     .then((res) => res.data.data[0].country)
                //     .catch(error => {
                //         console.log(error);
                //         return "Philippines"});
                let location = "philippines";

                    // let location = await axios
                    // .get(`http://api.positionstack.com/v1/reverse?access_key=&query=${position.coords.latitude},${position.coords.longitude}&limit=1`)
                    // .then((res) => res.data.data[0].country);
                
                //Get currenty country's currency and language
                let res = await axios.get(`https://restcountries.com/v3.1/name/${location}?fields=name,currencies,languages`)
                .then((res) => res.data[0]);
            
                const {country, currency, language } = parseItem(res);

                if (active){
                    setData((prevState) => ({...prevState, country:country, currency:currency[0], symbol:currency[1], language:language}));
                    setLoading(!loading);
            };

            }catch(err){
                console.log(err);
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