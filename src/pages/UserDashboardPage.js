import React from 'react'
import { Outlet } from 'react-router-dom';
// import { useContext } from 'react';
function UserDashboardPage() {
    //Functionality of if logged in then show dashboard either redirect to login page
  return (
    <Outlet/>
  )
}

export default UserDashboardPage
