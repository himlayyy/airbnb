import React, {useEffect, useState, createContext} from 'react';

const SearchContext = createContext();

function SearchContextProvider(props) {
    const [search, setSearchContext] = useState({       
    });

    const updateSearchContext = (key, value) => {        
        setSearchContext((prevState) => ({...prevState, [key]:value }));
        console.log(search);
    }

    useEffect(() =>{
        setSearchContext({
        country: null,
        dates: null,
        guests: null,
        datesString: null,
        guestsString: null,
        })
    }, []);  

    return (
        <SearchContext.Provider value={{search, updateSearchContext}}>
            {props.children}
        </SearchContext.Provider>
       
        
    );
};

export  {SearchContext, SearchContextProvider};


// function SearchContextProvider(props) {
//     const [search, setSearch] = useState({       
//     });

//     const updateSearchContext = (key, value) => {        
//         setSearch((prevState) => ({...prevState, [key]:value }));
//         console.log(search);
//     }

//     useEffect(() =>{
//         setSearch({
//         country: null,
//         dates: null,
//         guests: null,
//         datesString: null,
//         guestsString: null,
//         })
//     }, []);  

//     return (
//         <SearchContext.Provider value={{search, updateSearchContext}}>
//             {props.children}
//         </SearchContext.Provider>
       
        
//     );
// };

// export  {SearchContext, SearchContextProvider};