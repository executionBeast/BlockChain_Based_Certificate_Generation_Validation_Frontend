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
        <h2 className='font-light text-2xl'>All Students</h2>
        
        <table className='mt-4 '>
            <thead className=' text-black antialiased text-xl bg-gray-200'>
                <tr className=''>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Email Verified</th>
                    <th>Phone Verified</th>

                </tr>
            </thead>

            <tbody className='text-center'>
            {userData.map((val,index)=>{
            return (
            <tr key={index}>
            <td>{val.username}</td>  
            <td>{`${val.firstname} ${val.middlename} ${val.lastname}`}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{val.isEmailVerified? 'Yes': 'No'}</td>
            <td>{val.isPhoneVerified? 'Yes': 'No'}</td>
            
            </tr>)
        })}
            </tbody>
        </table>
        
    </div>
  )
}

export default Student;
