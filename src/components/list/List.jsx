import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function List(props) {
  const { endpoint, fields, itemClass, callback } = props;
  const [countries, setCountries] = useState(null);
  const { data, loading, error } = useFetch(
    `https://restcountries.com/v3.1/${endpoint}${fields ? fields : null}`
  );

  const sortCountries = (data) =>{
    let temp = []
    data.forEach((d) => {temp.push(d.name.common)});
    temp.sort();
    return temp;
  }
  useEffect(() =>{
    if(data){
      const sortedCountries = sortCountries(data);
      setCountries(sortedCountries);
    }
  }, [data])
  return (
    <>
      {/* {countries?.map((country) => {
            return(
                <span className={itemClass} onClick={(e) => callback(e.target.value))}>{country}</span>)
            })} */}
      {countries?.map((country) =>{
        return(
          <span 
          className={itemClass} 
          onClick = {(e) => {callback(e.target.innerText);
          console.log(e.target.innerText)}}>{country}</span>
        )
      })
      }
    </>
  );
}
export default List;
