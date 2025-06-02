import React, { useEffect, useState, useContext } from 'react';
// import LoginContextProvider from '../../context/LoginContext';
import Cookies from "js-cookie";
import axios from 'axios';
import CourseTable from '../../components/CourseTable';
import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';
function CourseEnrollment() {
  const courseUrl = `${process.env.REACT_APP_API_BASE_URL}/course`   //retrieve all course
  const issuerUrl = `${process.env.REACT_APP_API_BASE_URL}/users`
  const [courseData, setCourseData] = useState([]);
  const cookieLoginState = Cookies.get("loginState");
  console.log(cookieLoginState)
  
  useEffect(()=>{
      axios.get(courseUrl).then(
        (response)=>{
          setCourseData(response.data);
          console.log(response.data);
        }
      ).catch(
        (err)=>{
          console.log("Error Getting Course Data")
          alert(err)
        }
      )
      


    
  },[courseUrl,setCourseData])

  return (
    <div>
      <ToastContainer/>
      <h1 className="font-light text-2xl mt-4">Course Enrollment</h1>
      {courseData.length !== 0 ?
      <CourseTable courseData={courseData}/>
      :
      <div className='min-h-[412px] w-[100%] mt-4 relative border rounded'>
        <span style={{position:'absolute', top:'44%', left:'37%'}}>No courses available for enrollment at the moment!</span>
      </div>
      }
      </div>
  )
}

export default CourseEnrollment;

// ?      <div className='min-h-[412px] w-[100%] flex items-center justify-center border rounded mt-4'>
