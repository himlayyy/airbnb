// so ang flow is:
import axios from "axios";

import { GiForkKnifeSpoon, GiComb } from "react-icons/gi";
import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { FaSwimmingPool, FaSnowflake, FaDatabase } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
import { IoWaterOutline } from "react-icons/io5";
import { TbHanger, TbLuggage } from "react-icons/tb";
import { MdIron, MdOutlineBalcony, MdOutlineGrass, MdOutlineBedroomBaby, MdOutlineMicrowave } from "react-icons/md";


export const parseItem = (item) => {
                                
    const parseCurrency = (item) => {
        let currency = null;
        let symbol = null;
        
        if(Object.keys(item.currencies).length !== 0){            
            currency = Object.keys(item.currencies)[0];
            if(Object.keys(item.currencies[currency]).includes("symbol")){
                symbol = Object.values(item.currencies)[0].symbol;
            }
            else{
                symbol = currency;
            }
        }
        else{
            currency = "USD";
            symbol = "$";
        }
        return [currency, symbol];
    };

    const parseLanguage =  (item) =>{
        let language = null;
        if(Object.keys(item.languages).length !== 0){
            language = Object.values(item.languages)[0];
        }
        else{
            language = "English";
        }
        return language;
    };

    const parseCountry = (item) =>{
        return item.name.common;
    };

    let country = parseCountry (item);
    let currency = parseCurrency(item);
    let language = parseLanguage(item);

    return {country, currency, language};

};

export const countryCurrency = (data, delimiter, parserProp) => {

    const parseData = (data) => {
        let temp = [];
        temp = data.slice(0, delimiter);
        let parsed = temp.map((item) => {
            const {country, currency, language} = parseItem(item);  
            return {"country":country, "currency":currency[0], "symbol":currency[1], "language":language};
        });
        return parsed;
    };

    const checkCurrent = (parsed) => {
        
        if(!parsed.find(({country}) => country === parserProp[0].name.common )){
            const  {country, currency, language} = parseItem(parserProp[0]);

            let insert = {
                "country":country, "currency":currency[0], "symbol":currency[1], "language":language,"current":true

            }
    // Inserts current location at start of list
            parsed = [insert, ...parsed];
        }
        return parsed;
    };  

    let parsed = parseData(data);
    let final = checkCurrent(parsed);

    return final;
};

export const  generateOptions = async (country) =>{
    let res = await axios
        .get(
          `https://restcountries.com/v3.1/name/${country}?fields=latlng`
        )
        .then((res) => res.data[0].latlng)
         .catch((err) =>{
            console.log(err);
          })
    return res;
};

export const sentenceCase =  (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const capitalizeGuests = (arr) => {
    arr.forEach((val) => {
        val[0] = sentenceCase(val[0]);
    //   val[0] = val[0].charAt(0).toUpperCase() + val[0].slice(1);
    });
    const string = arr.map((val) => val.join(" ")).join();
    return string;
};

export const filterGuests = (obj) => {
    return Object.entries(obj).filter((a) => a[1] !== 0)
};

export const formatGuests = (obj) => {   
//     console.log("in format guests");
//     console.log(obj);
    const filtered = filterGuests(obj);
    // console.log("filtered");
    // console.log(filtered);

    if (filtered.length !== 0) {
      const string = capitalizeGuests(filtered);
      // console.log("caplitalized");
      // console.log(string);
      return string;
    } 
    else {
      return "Add guests";
    };
};

export const stringifyGuests = (obj) => {
    const string = formatGuests(obj);
    return string;
};

export const getTotalGuests = (obj) => {
    // const guestArr = Object.entries(filterGuests(obj));

    const totalGuests = getSumOfArray(Object.values(obj));
    // console.log(totalGuests);
    // console.log("totalGuests", totalGuests);
    return totalGuests;
};

export const getSumOfArray = (array) => {
    const sum = array.reduce((accumulator, value) => {
        return accumulator + value
    },0);
    // console.log(`Total guests: ${sum}`);
    return sum;
};


export const amenetiesIcons = [
    GiForkKnifeSpoon,
    AiOutlineCar,
    CgScreen,
    MdOutlineBalcony,
    TbLuggage,
    AiOutlineWifi,
    FaSwimmingPool,
    FaSnowflake,
    MdOutlineGrass,
    MdOutlineBedroomBaby,
    MdOutlineMicrowave,
    IoWaterOutline,
    TbHanger,
    MdIron
];

export const amenetiesLabel = [
    "Kitchen",
    "Free parking on premises",
    "TV",
    "Patio or balcony",
    "Luggage dropoff allowed",
    "Wifi",
    "Swimming pool",
    "Airconditioning",
    "Backyard",
    "Crib",
    "Hot water",
    "Hangers",
    "Iron"
];