import React from 'react'
import { Outlet } from 'react-router-dom';
import DashLink from '../IssuerDashboard/DashLink';

// import { useContext } from 'react';
function UserDashboardPage() {
    //Functionality of if logged in then show dashboard either redirect to login page
  return (
    <div className='user-dashboard h-screen w-screen flex flex-row overflow-hidden'>

    <div className="left links w-1/5 h-full bg-gray-900 flex flex-col items-center pt-8 ">

      <DashLink text="Course Enrollment" link="enroll-course"/>
      <DashLink text="View Certificates" link="view-certificate"/>

    </div>
    <div className="divider w-px bg-black h-full"></div>

    <div className="right content w-4/5 h-full bg-gray-500">
      <Outlet/>

    </div>

    </div>

  )
}

export default UserDashboardPage;
