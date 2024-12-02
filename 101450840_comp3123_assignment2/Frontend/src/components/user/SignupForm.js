
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './user.css';

const SignupForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8088/api/v1/user/signup', user);
      if (response.status === 201 || response.status === 200) {
        alert('Signup successful!');
        navigate('/login'); // Redirecting to login page after successful signup
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to sign up. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <div className="login-redirect">
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
      </div>
    </div>
  );
};

export default SignupForm;

