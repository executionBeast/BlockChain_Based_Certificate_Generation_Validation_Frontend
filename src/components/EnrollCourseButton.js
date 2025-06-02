import React, { useState } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';

function EnrollCourseButton({courseid}) {
  const cookieLoginState =  JSON.parse(Cookies.get("loginState"))
  const [success, setSuccess] = useState(false)

  const handleEnroll = async ()=>{
    try {
      const enrollPayload = {
      studentid:cookieLoginState.uid,
      courseid:courseid
    }
    console.log("COURSE ENROLL REACT FORM --->",enrollPayload)
    const rqstEnroll = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/course-enrollment`,enrollPayload);
    if(rqstEnroll.data){
      toast("Successfully Enrolled Course",{
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          style:{backgroundColor:'#fff'}
      })
      setSuccess(true)
    }
    }
    catch(err){
      toast("Error Occurred in Course Enrollment",{
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          style:{backgroundColor:'#F3733155'}
      })
      setSuccess(false)
    }
  }
  return (
    <div>
      
      <button onClick={handleEnroll} style={{backgroundColor: success? '#6EE6CC' : '#21212121'}} className='border rounded-sm bg-gray-200 p-1 m-2'> {
      success ? 'Enrolled'
      :
      'Enroll'
      }
      </button>
    </div>
  )
}

export default EnrollCourseButton;