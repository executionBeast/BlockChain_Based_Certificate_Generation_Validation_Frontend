import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';



const LoginPage = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
  // const loginContext = useContext(LoginContext);
  // console.log("awfugeasf--->",loginContext);
  // console.log("awfugeasf--->",isLoggedIn,setIsLoggedIn);

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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to backend
      const response = await axios.post('http://localhost:8000/api/login', formData);
      setSuccess('Login successful');
      setError('');
      console.log(response.data)
      Cookies.set("uid",response.data.uid,{ expires: 7 }) //setting cookies for frontend
      setIsLoggedIn(true) 

      // Do something after successful login, e.g., redirect or store user info
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid email or password!');
      setSuccess('');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {`Login Status Form Login Context: ${isLoggedIn}`}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

  );
};

export default LoginPage;
