import React, { useState } from 'react';
import axios from 'axios';
import {Navigate, useNavigate } from "react-router-dom";

import blockchainbg from './blockchainbg2.jpg'
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';

import {ClipLoader} from "react-spinners"
//react-icnos
import { FaRegCheckCircle } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    usertype:'',
    isEmailVerified: false,
    isPhoneVerified: false,
  });
  const [otpDisabled, setOtpDisabled] = useState(true)
  const [isOTPRequestLoading, setIsOTPRequestLoading] = useState(false)
  const [isSignedLoading, setIsSignedLoading] = useState(false)
  const [otp, setOtp] = useState(null)
  const [inOtp, setInOtp] = useState('')
  // const [otpError, setOtpError] = useState(false)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handling form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetForm = ()=>{
    document.querySelector(".signupform").reset();
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    setIsSignedLoading(true)
    e.preventDefault();
    try {
      // POST request to backend to sign up the user
      // console.log(formData)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user`, formData);
      setSuccess(true);
      setError('');
      // console.log(response.data)
      if(response.data){
        handleResetForm();
        setIsSignedLoading(false)
        navigate('/login')
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong!');
      setSuccess('');
    }
  };

  const handleOTPVerify = (e) =>{
    if(parseInt(inOtp) === parseInt(otp)){
      console.log("OTP : ", otp, "IN OTP : ", inOtp)
      setFormData({...formData, isEmailVerified: true})
      setInOtp('')
    }
    else{
      setFormData({...formData, isEmailVerified: false})
      toast("OTP entred is not correct!",{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      style:{backgroundColor:'#EB5B30'}
    })
    }
  }
const sendOtpRequest = () => {
  setIsOTPRequestLoading(true)
  const url = `${process.env.REACT_APP_API_BASE_URL}/send-otp`
  const otpPayload = {email: formData.email}
  axios.post(url, otpPayload).then(response => {
    setOtp(parseInt(response.data.data.otp))
    console.log("OTP RESPONSE : ", response.data)
    setOtpDisabled(false)
    setIsOTPRequestLoading(false)
      toast("OTP Sent Successfully!",{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
    })
  }).catch(err=> console.log("OTP ERROR : ", err))
  
    
    
}

  return (
    <div className='wrapper flex flex-row w-screen items-center justify-center px-4 '>
    <ToastContainer/>
   

      <div className="border-r rounded  self-center signup-container w-1/2 items-center justify-center bg-[#62E1C033] shadow-md shadow-[0px_0px_10px_5px_rgba(9,9,9,0.25)] mr-4 ">
        <h2 className="text-center text-4xl mt-4 font-[] "
          style={{fontFamily:"Merriweather, serif", color:"#212121CC"}} >Sign Up</h2>
           {/* <span>OTP : {JSON.stringify(otp)} In OTP  : {inOtp} </span> */}
           {/* {JSON.stringify(isOTPRequestLoading)} */}
          {/* {JSON.stringify(formData)} */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form className='signupform flex flex-col justify-center items-center py-8 space-y-6' onSubmit={handleSubmit}>
          <div className="form-group flex flex-col" >
            <input
              placeholder="username"
              // size={12}
              className="border border-black rounded-md pl-1"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="First name"
              className="border border-black rounded-md pl-1"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            
            <input
              placeholder="Middle name"
              className="border border-black rounded-md pl-1"
              type="text"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Last name"
              className="border border-black rounded-md pl-1"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group ">
            <div className='relative'>
            <input
              placeholder="Email"
              className="border border-black rounded-md pl-1 "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            /> {formData.isEmailVerified && <FaRegCheckCircle color='green' size={20} className='absolute right-[-25px] top-[3px]'/>} </div>

            <div className='mt-2 flex justify-between'>
              { formData.isEmailVerified === false ?  <input
              disabled={otpDisabled}
              placeholder="OTP"
              className="border border-black rounded pl-1 w-[8em] h-[1.2em] p-1"
              type="text"
              name="otp"
              value={inOtp}
              onChange={(e)=> setInOtp(parseInt(e.target.value))}
              required
              />
             :
             <p className='text-green-500 text-sm'>Email Verified Successfully! </p>
            }
              
              {
                otp === null ?
                <>
                {isOTPRequestLoading === false ? 
                <button type='button' onClick={sendOtpRequest} className='rounded bg-blue-600 px-1 text-white text-sm ' >Send OTP</button> 
                :
                <ClipLoader className='relative right-[20px]' color="#656565" size={20} />
               }    
                 
                
                </>
                 :
                 <>
                 {!formData.isEmailVerified &&
                 <button type='button'  onClick={handleOTPVerify} className='rounded bg-green-700 px-1 text-white text-sm' >Verify OTP</button>
                 }
                 </>
                }

            </div>

          </div>
          <div className="form-group">
            <input
              placeholder="Phone number"
              className="border border-black rounded-md pl-1"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              className="border border-black rounded-md pl-1"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
          </div>
          <div className="form-group">
            <label className='mr-2'>Are you?</label>
            <input
              className="mx-1"
              type="radio"
              name="usertype"
              checked={formData.usertype==="student"}
              value="student"
              onChange={handleChange}
              required
            />
            <label htmlFor="usertype">Student</label>
            <input
              className="mx-1"
              type="radio"
              name="usertype"
              value="issuer"
              checked={formData.usertype==="issuer"}
              onChange={handleChange}
              required
            />
            <label htmlFor="usertype">Issuer</label>
          </div>
          { success === false ? 

            <>
              { isSignedLoading === false ? 
            <button style={{backgroundColor:formData.isEmailVerified === true ? '' : '#fff'}} className="border border-black rounded-md p-1 bg-white" type="submit">Sign Up</button>
          :
            <ClipLoader className='relative right-[20px]' color="#656565" size={28} />
          
          }
            </>
            : 
             <p className='text-green-500 text-md'>Signed Up Successfully! </p>
            
          }

        
            </form>
        {/* {success && <Navigate to="/login" replace={true}/>} */}
      </div>
      
      <div className="self-center signup-container w-1/2 items-center justify-center pr-12 bg-blue">
        <img src={blockchainbg} alt="blkbg"/>
      </div>
    </div>
  );
};

export default SignupPage;
