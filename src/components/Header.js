import React, { useEffect, useState, useContext } from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png';
import { LoginContext } from '../context/LoginContextProvider';

function Header() {
  const {loginState, login, logout} = useContext(LoginContext);

  console.log("loginState, login , logout ", loginState, login , logout);
  
  return (
    <div className='flex w-screen items-center justify-between  max-h-16  px-8 pt-2'>
      
      <div className="logo ">

        <NavLink 
          to="/"
          className="">
          <img className='h-20 w-20'  src={logo} alt="logo"/>
        </NavLink>

      </div>
      
      <div className="flex w-stretch space-x-4 mx-4 ">
        
        <NavLink
          className="font-medium hover:underline"
          to= {"/privateroute"}>
          Dashboard
        </NavLink>
      
      </div>

      <div className="right mx-4 flex w-stretch space-x-4">
       {!loginState.isLoggedIn && <NavLink
          className="border px-4 bg-orange-600 rounded font-medium hover:bg-orange-500"
          to={"/privateroute"}>
          Login
          
        </NavLink>}

       {loginState.isLoggedIn && <NavLink
          className={"border px-4 bg-orange-500 rounded font-medium hover:bg-[#E7742E]"}
          to={"/logoutroute"}>
          Logout
        </NavLink>}

      </div>
      

    </div>
  )
}

export default Header;