// so ang flow is:
import axios from "axios";

export const countryCurrency = (data, delimiter, parserProp) => {
    // let temp = [];
    // temp = data.slice(0, delimiter);

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
        // console.log([currency, symbol])
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

    const parseItem = (item) =>{
        let country = parseCountry(item);
        // let symbol = parse
        let currency = parseCurrency(item);
        let language = parseLanguage(item);
        // console.log(currency, symbol);

        return {country, currency, language};
        // return {country, currency, symbol, language};
    };

    const parseData = (data) => {
        let temp = [];
        temp = data.slice(0, delimiter);
        let parsed = temp.map((item) => {
            // console.log(item);
            const {country, currency, language} = parseItem(item);  
            return {"country":country, "currency":currency[0], "symbol":currency[1], "language":language};
        });
        // console.log(parsed);
        return parsed;
    };

    const checkCurrent = (parsed) => {
        // console.log("Checking~");
        // console.log(parsed.slice(0, 6));
        
        if(!parsed.find(({country}) => country === parserProp[0].name.common )){
            // console.log("Not found");
            // console.log("currency parsing starts here");
            // console.log(parserProp[0]);
            const  {country, currency, language} = parseItem(parserProp[0]);

            let insert = {
                "country":country, "currency":currency[0], "symbol":currency[1], "language":language,"current":true

            }
    // Inserts current location at start of list
            parsed = [insert, ...parsed];
                    }
    // return parsed;
  
    
        // console.log(parsed[0], Object.keys(parsed[0]));
        return parsed;
    };  
    console.log("in helpers");

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
            console.log("ERR");
            console.log(err);
          })
    return res;
};
