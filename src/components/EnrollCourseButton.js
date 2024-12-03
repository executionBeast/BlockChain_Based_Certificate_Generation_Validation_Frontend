import React from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

function EnrollCourseButton({courseid}) {
  const cookieLoginState =  JSON.parse(Cookies.get("loginState"))
  
  const handleEnroll = async ()=>{
    const enrollPayload = {
      studentid:cookieLoginState.uid,
      courseid:courseid
    }
    console.log("COURSE ENROLL REACT FORM --->",enrollPayload)
    const rqstEnroll = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/course-enrollment`,enrollPayload);
    if(rqstEnroll.data){
      alert("Successfully Enrolled For Course!")
    }
  }
  return (
    <div>
      <button onClick={handleEnroll} className='border rounded-sm bg-gray-600 p-1 m-2'> Enroll</button>
    </div>
  )
}

export default EnrollCourseButton;