import React, {useState } from 'react'
import {NavLink, useLocation } from 'react-router-dom';

function Header() {
  // const {pathname} = useLocation();
  
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
      
      <div className="flex w-stretch space-x-4 mx-4 ">
        <NavLink
        to={"/user/dashboard"}
        className={`$`}>
        Dashboard
        </NavLink>
      
      </div>

      <div className="right mx-4 flex w-stretch space-x-4">
        <NavLink
        to={"/login"}>
        Login 
        </NavLink>
        
        <NavLink
        to={"/signup"}> 
        Signup 
        </NavLink>

      </div>
      

    </div>
  )
}

export default Header;