import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { Navigate, useNavigate } from 'react-router-dom';

// console.log("From index.js ---> ",Cookies.get("loginState"))

function PrivateRoute() {
    const navigate = useNavigate();
    const cookieLoginState = Cookies.get("loginState");

    useEffect(()=>{
        try{
            console.log("Returned Cookie --> ",cookieLoginState);
            if(cookieLoginState){
                if(JSON.parse(cookieLoginState).userdata.usertype==="issuer"){
                    navigate("/issuer-dashboard")
                }
                if(JSON.parse(cookieLoginState).userdata.usertype==="student"){
                    navigate("/student-dashboard")
    
                }
            }
            else{
                console.log("You are Not Logged In")
                navigate("/login");
            }
    
        }
        catch(err){
            console.log("Error Occured in private Route");
            navigate("/login");
        }
    })


    return (0);
}

export default PrivateRoute;
