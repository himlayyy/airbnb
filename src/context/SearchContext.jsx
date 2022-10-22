import React, {useEffect, useState, createContext} from 'react';

const SearchContext = createContext();

function SearchContextProvider(props) {
    const [search, setSearch] = useState({       
    });

    const updateSearchContext = (key, value) => {
        console.log("in update search!")
        console.log(key, value)
        
        setSearch((prevState) => ({...prevState, [key]:value }));
    }

    useEffect(() =>{
        setSearch({
        country: "",
        dates: {},
        guests: {}})
    }, []);  

    return (
        <SearchContext.Provider value={{search, updateSearchContext}}>
            {props.children}
        </SearchContext.Provider>
    );
};

export  {SearchContext, SearchContextProvider};