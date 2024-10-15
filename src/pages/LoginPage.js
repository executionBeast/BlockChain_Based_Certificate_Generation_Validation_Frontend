import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Navigate } from 'react-router-dom';


const LoginPage = () => {
  const {loginState, setLoginState} = useContext(LoginContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handling input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    let cookieloginState = Cookies.get("loginState");
    setLoginState(cookieloginState)
  },[success,setLoginState])

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to backend
      const response = await axios.post('http://localhost:8000/api/login', formData);
      setSuccess('Login successful');
      setError('');
      console.log(response.data)

      let cookieData = {
        isLoggedIn:true,
        uid:response.data.uid,
        userdata:response.data.userdata
      }
      Cookies.set("loginState",JSON.stringify(cookieData),{ expires: 7 }) //setting cookies for frontend
      // setIsLoggedIn(response.data)



      // Do something after successful login, e.g., redirect or store user info
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid email or password!');
      setSuccess('');
    }
  };


  return (
    <div className="login-container w-screen items-center justify-center">
      <h2 className="text-center text-4xl my-4">Login</h2>
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
        <div className="form-froup items-center justify-center">
          <button className="border border-black rounded-md p-1" type="submit">Login</button>

        </div>
      </form>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {`Login Status Form Login Context: ${loginState}`}

      {success && <Navigate to="/" replace={true}/>}
    </div>

  );
};

export default LoginPage;
