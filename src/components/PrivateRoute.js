import React, { useEffect, useContext } from 'react'
import { LoginContext } from '../context/LoginContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';


function PrivateRoute() {
    const {loginState} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(()=>{
        try{

            if(loginState?.isLoggedIn){
                if(loginState.userdata.usertype==="issuer"){
                    navigate("/issuer-dashboard")
                }
                if(loginState.userdata.usertype==="student"){
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
