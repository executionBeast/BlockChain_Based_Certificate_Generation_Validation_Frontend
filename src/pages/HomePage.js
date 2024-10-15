import React, { useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react';
import Cookies from "js-cookie";

function HomePage() {
  const {loginState, setLoginState} = useContext(LoginContext)

  useEffect(()=>{
      
    try{

      let cookieLoginState = JSON.parse(Cookies.get("loginState"))
      console.log(cookieLoginState)
      setLoginState(cookieLoginState)
    }
    catch(err){
      console.log("User is not Logged In");
    }
  },[setLoginState])


  return (
    <div>
      <h1>HomePage</h1>
      <h1>{loginState?JSON.stringify(loginState):"Not Logged In"}</h1>
    </div>
  )
}

export default HomePage;
