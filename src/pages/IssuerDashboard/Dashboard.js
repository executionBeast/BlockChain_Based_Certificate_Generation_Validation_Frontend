import React from 'react';
import { Outlet } from 'react-router-dom';
import DashLink from './DashLink';

function IssuerDashboard() {
  return (
    <div className='issuer-dashboard h-screen w-screen flex flex-row overflow-hidden'>

      <div className="links w-1/5 h-full bg-red-900 flex flex-col items-center pt-8 ">
        
            <DashLink text="List Students" link="students"/>
            <DashLink text="Course Creation" link="create-course"/>
            <DashLink text="Certifcate Issuance" link="issuance"/>
            <DashLink text="Misc" link="misc"/>
            
      </div>

      <div className="divider w-px bg-black h-full"></div>
      <div className="content w-4/5 h-full bg-yellow-900">
        <Outlet/>
      </div>
    </div>
  )
}

export default IssuerDashboard;
