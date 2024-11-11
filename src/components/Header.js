import React, {useState,useContext, useEffect } from 'react'
import {NavLink, useLocation } from 'react-router-dom';
import Cookies from "js-cookie"
import { LoginContext } from '../context/LoginContext';
import logo from '../images/logo.png';


function Header() {
  const [logSignState,setLogSignState] = useState(false);
  const {loginState, setLoginState} = useContext(LoginContext);
  const cookieLoginState = Cookies.get("loginState");
  
  // console.log("LOGIN STATE, COOKIE",loginState, cookieLoginState) 
  const logout = ()=>{
    Cookies.remove('loginState')
    setLoginState({})
  }
  useEffect(()=>{
    try{

        setLoginState(JSON.parse(cookieLoginState));
        if(cookieLoginState){
          setLogSignState(true)
        }
      
    }
    catch(err){
      console.log(err)
    }

  },[cookieLoginState,setLoginState])  


  return (
    <div className='flex w-screen items-center justify-between h-28 max-h-48 px-4'>
      
      <div className="logo ">
        <NavLink 
        to="/"
          className="">

        <img className='h-20 w-20'  src={logo} alt="logo"/>
        
        </NavLink>

      </div>
      
      <div className="flex w-stretch space-x-4 mx-4 ">
        <NavLink
        to={"/user/dashboard"}
        className="font-medium hover:underline ">
        Dashboard
        </NavLink>
      
      </div>

{/* For Temporary this is added in header it should be removed later when on logg in issuer redirect to it*/}
        {/* <div className="flex w-stretch space-x-4 mx-4 ">
          <NavLink
          to={"issuer-dashboard"}
          className={`$`}>
          Issuer-Dashboard
          </NavLink>
        
        </div> */}
{/* For Temporary this is added in header it should be removed later when on logg in issuer redirect to it*/}


      <div className="right mx-4 flex w-stretch space-x-4">
       {!loginState.uid && <NavLink
        className="border px-2 bg-orange-600 rounded font-medium hover:underline"
        to={"/login"}>
        Login 
        </NavLink>}
        
      {!loginState.uid &&  <NavLink
        className=" border px-2 bg-orange-600 rounded font-medium hover:underline"
        to={"/signup"}> 
        Signup 
        </NavLink>}

      {loginState.uid && <button className="font-medium hover:underline" onClick={logout}>Logout</button>}
      </div>
      

    </div>
  )
}

export default Header;