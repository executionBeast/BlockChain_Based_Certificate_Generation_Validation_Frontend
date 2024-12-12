import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContextProvider';

function LogoutRoute() {
    const {logout} = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(()=>{
        try{
            logout()
            navigate("/")
        }
        catch(err){
            console.log("Error Occurred while logout ")
        }
    });


  return (0);
}

export default LogoutRoute;
