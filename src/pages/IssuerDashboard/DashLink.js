import React from 'react'
import { NavLink } from 'react-router-dom'

function DashLink({text,link}) {
  return (
    <div className="link rounded ">
        <NavLink
        className=" text-slate-900 px-2 rounded py-1"
        to={link}
        style={({isActive})=>{
            return {
                fontWeight: isActive ? "300" : "300",
                backgroundColor: isActive? "#91919119" : "transparent",
            }
        }}
        >
            {text}
        </NavLink>
    </div>
)
}

export default DashLink;
