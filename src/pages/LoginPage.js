import React, {useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../context/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const {loginState, login} = useContext(LoginContext);

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
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, formData);
      setSuccess('Login successful');
      setError('');
      console.log(response.data)

      let loginData = {
        isLoggedIn:true,
        uid:response.data.uid,
        userdata:response.data.userdata
      }
      login(loginData);
      navigate("/privateroute");

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

      {`Login Status Form Login Context: ${JSON.stringify(loginState)}`}
    </div>

  );
};

export default LoginPage;
