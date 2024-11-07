import React, {useState,useContext, useEffect } from 'react'
import {NavLink, useLocation } from 'react-router-dom';
import Cookies from "js-cookie"
import { LoginContext } from '../context/LoginContext';

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
    <div className='flex w-screen items-stretch bg-red-300 py-4 px-2'>
      <div className="left w-full ">
        <NavLink 
        to="/"
        className={(isActive)=>
          isActive ? 'mr-4':'hidden'
        }>
        /
        </NavLink>

      </div>
      
      {/* <div className="flex w-stretch space-x-4 mx-4 ">
        <NavLink
        to={"/user/dashboard"}
        className={`$`}>
        Dashboard
        </NavLink>
      
      </div> */}

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
        
        to={"/login"}>
        Login 
        </NavLink>}
        
      {!loginState.uid &&  <NavLink
        to={"/signup"}> 
        Signup 
        </NavLink>}

      {loginState.uid && <button onClick={logout}>Logout</button>}
      </div>
      

    </div>
  )
}

export default Header;