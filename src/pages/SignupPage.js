import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to backend to sign up the user
      const response = await axios.post('http://localhost:8000/api/user', formData);
      setSuccess('User registered successfully');
      setError('');
      console.log(response.data)
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong!');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Middle Name (Optional)</label>
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name (Optional)</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
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
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
