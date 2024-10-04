import React, { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
};

export default LoginContextProvider;