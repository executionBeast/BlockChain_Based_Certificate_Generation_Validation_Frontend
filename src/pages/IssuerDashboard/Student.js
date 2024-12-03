import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Student() {

    const [userData,setUserData]=useState([]);
    const url = `${process.env.REACT_APP_API_BASE_URL}/users`;
    
    useEffect(()=>{
        const fetchUserData = async ()=>{
            const userdata = await axios.get(url);
            setUserData(userdata.data)

        }
            

        fetchUserData();    
    },[url, setUserData]);
    return (
    
    <div className='flex flex-col mt-6'>
        <h2 className='font-light text-2xl mt-4'>All Students</h2>
        
        <table className='mt-4 bg-[#D1D5DB]'>
            <thead className=' text-white antialiased text-xl  bg-[#233941]'>
                <tr className=''>
                    <th className='font-[400]'>Username</th>
                    <th className='font-[400]'>Firstname</th>
                    <th className='font-[400]'>Middlename</th>
                    <th className='font-[400]'>Lastname</th>
                    <th className='font-[400]'>Email</th>
                    <th className='font-[400]'>Phone</th>
                    <th className='font-[400]'>EmailVerified</th>
                    <th className='font-[400]'>Phone Verified</th>

                </tr>
            </thead>

            <tbody className='text-center'>
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
