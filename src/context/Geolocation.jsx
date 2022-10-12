import React, {useState, useEffect,  createContext} from "react";
import useFetch from "../hooks/useFetch";

const GeoContext = createContext();  

function GeoContextProvider(props){     
    const {data, loading, error} = useFetch("http://ip-api.com/json/?fields=status,message,continent,country,countryCode,regionName,city,zip,lat,lon,timezone,currency,query");  

    const [geoContext, setGeoContext] = useState({});

    const updateContext = (arr) =>{
        const temp = {}
        arr.forEach(({key, value}) =>{return temp[key]= value});
        
        
        (
        setGeoContext((prevState) => ({...prevState, ...temp })
        )
        );
        console.log(geoContext);
    };

    // const updateContext = ({key, value}) =>{
    //     const temp = {...geoContext, [key] : value};
        
    //     (
    //     setGeoContext({...temp}
    //     )
    //     );
    //     console.log(geoContext);
    // };

    useEffect(() => {
        console.log(geoContext);
    }, [geoContext])

    useEffect(() => {
        if(!loading){
            setGeoContext({
                ...data,
            })
        }
    }, [loading]);
    
    return (
        <GeoContext.Provider value={{geoContext, updateContext}} >
            {/* {console.log(geoContext)} */}
           {props.children}
        </GeoContext.Provider>
    )
};

export {GeoContext, GeoContextProvider};