import React, { useState,createContext,useEffect } from "react";
import Cookies from "js-cookie";

export const LoginContext = createContext();

const LoginContextProvider = ({children}) =>{

    const [loginState, setLoginState] = useState({
        isLoggedIn:false,
        uid:'',
        userdata:{}
    });
    
    useEffect(()=>{
        const cookieLoginState = Cookies.get("loginState");

        console.log("Logging from useEffect of LoginContext ")
        if(cookieLoginState){
            let cookieLoginData = JSON.parse(cookieLoginState);
            setLoginState(cookieLoginData);
        }
        else{
            console.log("User not logged in! ")
        }

    },[setLoginState]);

    const login  = (loginData)=>{
        console.log("Logging from LoginContext login function");
        Cookies.set("loginState",JSON.stringify(loginData),{ expires: 7 });
        setLoginState(loginData);
    };

    const logout = ()=>{
        console.log("Logging from LoginContext logout function");
        Cookies.remove("loginState");
        setLoginState({
            isLoggedIn:false,
            uid:null,
            userdata:null
        })
    };

    return(
        <LoginContext.Provider value={{loginState, login, logout}}>
            {children}
        </LoginContext.Provider>
    )
};

export default LoginContextProvider;