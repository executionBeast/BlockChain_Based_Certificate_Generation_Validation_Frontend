import React, {useEffect} from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function LogoutHandler() {
    const navigate = useNavigate();
    // const cookieLoginState = Cookies.get("loginState");
    useEffect(()=>{ 
        try{
            Cookies.remove("loginState");
            navigate("/")
        }
        catch(err){
            console.log("Error Occurred while logout ")
        }
    });


  return (0);
}

export default LogoutHandler;
