import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Student() {

    const [userData,setUserData] =useState([]);
    const url = "http://localhost:8000/api/users";
    
    useEffect(()=>{

        const fetchUserData = async ()=>{
            const userdata = await axios.get(url);
            setUserData(userdata.data)

        }
        fetchUserData();
    },[url])
    return (
    
    <div className='flex flex-col space-x-2 items-center justify-center mt-4'>
        Student Details Table Page
        <table className='items-center justify-center mt-2'>
            <thead>
                <tr>
                    <th>username</th>
                    <th>Firstname</th>
                    <th>Middlename</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>EmailVerified</th>
                    <th>Phone Verified</th>

                </tr>
            </thead>

            <tbody>
            {userData.map((val,index)=>{
            return (
            <tr key={index}>
            <td>{val.username}</td>
            <td>{val.firstname}</td>
            <td>{val.middlename}</td>
            <td>{val.lastname}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{val.isEmailVerified}</td>
            <td>{val.isPhoneVerified}</td>
            
            </tr>)
        })}
            </tbody>
        </table>
        
    </div>
  )
}

export default Student;
