import React, { useState } from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    usertype:''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    e.preventDefault();
    try {
      // POST request to backend to sign up the user
      // console.log(formData)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user`, formData);
      setSuccess('User registered successfully');
      setError('');
      // console.log(response.data)
      if(response.data){
        handleResetForm();
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong!');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container w-screen items-center justify-center">
      <h2 className="text-center text-4xl mt-4">Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className='signupform flex flex-col items-center justify-center py-8 space-y-6' onSubmit={handleSubmit}>
        <div className="form-group">
          
          <input
            placeholder="username"
            className="border border-black rounded-md p-1"
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
            className="border border-black rounded-md p-1"
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
            className="border border-black rounded-md p-1"
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Last name"
            className="border border-black rounded-md p-1"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Email"
            className="border border-black rounded-md p-1"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Phone number"
            className="border border-black rounded-md p-1"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            className="border border-black rounded-md p-1"
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
        <button className="border border-black rounded-md p-1" type="submit">Sign Up</button>
      </form>
      {success && <Navigate to="/login" replace={true}/>}
    </div>
  );
};

export default SignupPage;
