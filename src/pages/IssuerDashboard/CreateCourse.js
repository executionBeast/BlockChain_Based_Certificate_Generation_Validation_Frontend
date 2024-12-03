import React,{useState,useContext, useEffect, useCallback} from 'react'
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';
import Cookies from "js-cookie";
import ShowCourse from '../../components/ShowCourse';


function CreateCourse() {
  const userCookieData = Cookies.get("loginState");
  const [courseData, setCourseData] = useState([]);
  const {loginState, setLoginState} = useContext(LoginContext); //at this time loginState is not populated
  

  const [formData, setFormData] = useState({
        issuerid:JSON.parse(userCookieData).uid,
        title:"",
        certitype:""
  });
  

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value, issuerid:loginState.uid})
  }

  const getCourse = async ()=>{
    try{
      console.log("UID",userCookieData.uid) //Fine
      const url  = `${process.env.REACT_APP_API_BASE_URL}/course`
      const res = await axios.get(url,{
        params:{ issuerid:JSON.parse(userCookieData).uid}
      })

      console.log("COURSE DATA ",res.data, userCookieData);
      // setCourseData({...res.data, issuername:userCookieData.userdata.username)
      setCourseData(res.data)


  
    }
    catch(err){
      console.log(err)
    }
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}/course`
    console.log("Form Data",formData)
    try{
      const res = await axios.post(url, formData)
      console.log("COURSE CREATION REQ RESPONSE",res.data)
      // res.data&&alert("COURSE CREATED");
      getCourse();



    }
    catch(err){
      console.log("ERROR WHILE CREATING COURSE",err)
    }
  }




  useEffect(()=>{
    ;(async ()=>{
      try{
        console.log("UID",userCookieData.uid) //Fine
        const url  = `${process.env.REACT_APP_API_BASE_URL}/course`
        const res = await axios.get(url,{
          params:{ issuerid:userCookieData.uid}
        })
  
        // console.log("COURSE DATA ",res.data, userCookieData);
        // setCourseData({...res.data, issuername:userCookieData.userdata.username)
        setCourseData(res.data)
  
  
    
      }
      catch(err){
        console.log(err)
      }
      
    })();
    // getCourse();
  },[userCookieData.uid])


  return (
    <div className='course-creation flex flex-col mt-6'>

      <h1 className="font-light text-2xl mt-4">
        All Courses
      </h1>
      
      <ShowCourse courseData={courseData}/>

      <form className="">
        <input className={inputStyle} type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Course"></input>
        <select className="bg-gray-300 rounded font-light" name="certitype" value={formData.certitype} onChange={handleChange}>
          <option value="">Select Certificate Type </option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="C4">C4</option>

        </select>
        <button className="border rounded mx-2  px-2 bg-orange-600" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}


const inputStyle = "p-2 m-2 border rounded"
export default CreateCourse;
