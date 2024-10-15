import React, { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext({});

const LoginContextProvider = ({children}) =>{
    const [loginState, setLoginState] = useState({
        isLoggedIn:false,
        uid:'',
        userdata:{}
    });
    return(
        <LoginContext.Provider value={{loginState,setLoginState}}>
            {children}
        </LoginContext.Provider>
    )
};

export default LoginContextProvider;