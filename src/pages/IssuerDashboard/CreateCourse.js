import React,{useState,useContext, useEffect, useCallback} from 'react'
import axios from 'axios';
import { LoginContext } from '../../context/LoginContextProvider';
import Cookies from "js-cookie";
import ShowCourse from '../../components/ShowCourse';
import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';

function CreateCourse() {
  const userCookieData = JSON.parse(Cookies.get("loginState"));
  const userdata = userCookieData.userdata
  // console.log("}|}|}|}|}|}|}|}", userdata)
  const [courseData, setCourseData] = useState([]);
  const {loginState, setLoginState} = useContext(LoginContext);   //at this time loginState is not populated
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  

  const [formData, setFormData] = useState({
        issuerid:userdata._id,
        issuername:`${userdata.firstname} ${userdata.middlename} ${userdata.lastname}`,
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
        params:{ issuerid:userCookieData.uid}
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
    setIsSubmitLoading(true)
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}/course`
    console.log("Form Data",formData)
    try{
      const res = await axios.post(url, formData)
      console.log("COURSE CREATION REQ RESPONSE",res.data)
      // res.data&&alert("COURSE CREATED");
      await getCourse();
      if(res.data) {
      toast("Course Created Successfully",{
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        style:{backgroundColor:'#fff'}
    })
    setFormData({...formData, title:'', certitype:""})
      }
     
    }
    catch(err){
      console.log("ERROR WHILE CREATING COURSE",err)
      toast("Error Encountered While Course Creation",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            style:{backgroundColor:'#F3733155'}
      })
    }
    finally{
      setIsSubmitLoading(false)
    }
  }




  useEffect(()=>{
    setIsLoading(true)

    ;(async ()=>{
      try{
        console.log("UID",userCookieData.uid) //Fine
        const url  = `${process.env.REACT_APP_API_BASE_URL}/course`
        setIsLoading(true)
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
      finally {
        setIsLoading(false)
      }         
      
    })();
    // getCourse();
  },[userCookieData.uid])


  return (
    <div className='course-creation flex flex-col mt-2'>
      <ToastContainer/>
      <h1 className="font-light text-2xl mt-4">
        All Courses
      </h1>
      {isLoading ? (
        <div className="mt-6 text-center text-gray-500">            
          <ClipLoader className='relative right-[20px]' color="#656565" size={28} />
        </div>
        
      )  : courseData.length === 0 ?
      (<div className='min-h-[212px] w-full mt-4 relative border rounded'>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600'>
            No courses created yet — start by adding your first course!
          </span>
        </div> 
      )
      :
      <ShowCourse courseData={courseData}/>
      }

      <form className="">
        <input className={inputStyle} type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Course title"></input>
        <select className="bg-gray-300 rounded font-light" name="certitype" value={formData.certitype} onChange={handleChange}>
          <option value="">Select Certificate Type </option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="C4">C4</option>

        </select>
        {isSubmitLoading ? (
          <ClipLoader className='relative ml-8 top-[4px]' color="#656565" size={20} />
          
        ) : (
          <button className="border rounded mx-2  px-2 bg-orange-600" type="submit" onClick={handleSubmit}>Submit</button>
        )  
        }
      </form>
    </div>
  )
}


const inputStyle = "p-2 m-2 border rounded"
export default CreateCourse;
