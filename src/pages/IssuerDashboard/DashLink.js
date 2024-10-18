import React from 'react'
import { NavLink } from 'react-router-dom'

function DashLink({text,link}) {
  return (
    <div className="link my-4 text-blue-600 underline">
        <NavLink
        to={link}
        style={({isActive})=>{
            return {
                fontWeight: isActive ? "700" : "400",
            }
        }}
        >
            {`${text}->`}
        </NavLink>
    </div>
)
}

export default DashLink;
