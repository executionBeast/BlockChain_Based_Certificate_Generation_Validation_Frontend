import React from 'react';
import { Outlet } from 'react-router-dom';
import DashLink from '../../components/DashLink';

function Divider(){
  return(
    <div 
    className='h-full border bg-black'></div>
  )
}

function IssuerDashboard() {
  return (
    <div className='issuer-dashboard h-screen w-screen flex flex-col overflow-hidden'>

      <div className="links flex flex-row items-center px-10 gap-8 pt-4 ">
        
            <DashLink text="View Students" link="students"/>
            <Divider/>
            <DashLink text="Create Course" link="create-course"/>
            <Divider/>
            <DashLink text="Issue Certificates" link="issuance"/>
            {/* <DashLink text="Misc" link="misc"/> */}
            
      </div>

      <div className="content h-full w-full px-10">
        <Outlet/>
      </div>

    </div>
  )
}

export default IssuerDashboard;
