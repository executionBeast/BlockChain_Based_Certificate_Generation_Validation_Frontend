import React, { useEffect, useState, useContext } from 'react';
// import LoginContextProvider from '../../context/LoginContext';
import Cookies from "js-cookie";
import axios from 'axios';
import CourseTable from '../../components/CourseTable';

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
      <h1 className="text-4xl text-center">Course Enrollment</h1>
      <CourseTable courseData={courseData}/>
    </div>
  )
}

export default CourseEnrollment;
