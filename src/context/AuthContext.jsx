
import React, {useEffect, createContext, useState, useReducer} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, loading, error] = useAuthState();
    const [authStatus, setAuthStatus] = useState(null);



    useEffect(() => {
        if(user){
            setAuthStatus(user);
            console.log("authStatus");
            console.log(authStatus);
        }
    },[user]);

    return (
        <AuthContext.Provider value = {{authStatus}}>
            {props.children}
        </AuthContext.Provider>

    )
}

export  {AuthContext, AuthContextProvider};