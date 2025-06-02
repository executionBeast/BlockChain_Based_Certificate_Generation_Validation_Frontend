import React, {useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../context/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ClipLoader} from "react-spinners"
//react-icnos
import { FaRegCheckCircle } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const {loginState, login} = useContext(LoginContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [msg, setMsg] = useState('')
  const [isLogInLoading, setIsLogInLoading] = useState(false)

  // Handling input changes
  const handleChange = (e) => {
    setMsg('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    setIsLogInLoading(true)
    e.preventDefault();
    
    try {
      
      // Sending login request to backend
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, formData);
      setSuccess('Login successful');
      setError(false);
      console.log("Login Response : ", response.data)

      let loginData = {
        isLoggedIn:true,
        uid:response.data.uid,
        userdata:response.data.userdata
      }
      setSuccess(true)
      setMsg("Successfully Logged In!")
      setIsLogInLoading(false)

      login(loginData);
      navigate("/privateroute");

      // Do something after successful login, e.g., redirect or store user info
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid email or password!');
      setMsg('Invalid email or password!')
      setSuccess(false);
      setIsLogInLoading(false)


    }
  };


  return (
    <div className='wrapper flex flex-row w-screen items-center justify-center px-4 mt-32'>

    <div className="login-container border-r rounded  self-center signup-container w-1/2 items-center justify-center bg-[#62E1C0CC] shadow-md shadow-[0px_0px_10px_5px_rgba(9,9,9,0.25)] mr-4 ">
      <h2 className="text-center text-4xl my-4" style={{fontFamily:"Merriweather, serif", color:"#212121CC"}} >Login</h2>
      <div className="form-center w-full items-center justify-center "> 
      <form className="flex flex-col items-center justify-center py-8 space-y-6" onSubmit={handleSubmit}>
        <div className="form-group items-center justify-center">
          <input
            className="border border-black rounded-md p-1"
            placeholder='Email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group items-center justify-center">
          <input
            className="border border-black rounded-md p-1"
            placeholder='Password'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <span style={{color: success === true ? 'green' : 'red', fontSize:'bold'}}> {msg}</span>
        <div className="form-froup items-center justify-center">
         { isLogInLoading === false ? 
          <button className="border border-black rounded-md p-1 bg-white" type="submit">Login</button>
          :
          <ClipLoader className='relative right-[20px]' color="#656565" size={28} />
          
         }
        </div>
      </form>
      </div>
    </div>



    </div>
  );
};

export default LoginPage;
