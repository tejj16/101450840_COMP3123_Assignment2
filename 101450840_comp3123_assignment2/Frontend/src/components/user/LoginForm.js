


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './user.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(null); // State for error message

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8088/api/v1/user/login', credentials);

      if (response.status === 200) {
        // Save the token in localStorage
        localStorage.setItem('userToken', response.data.token); // Assuming the token is in response.data.token

        alert('Login successful!');
        setCredentials({ email: '', password: '' }); // Clear the form on success
        navigate('/employee/'); // Redirect to employee page
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <div className="signup-redirect">
        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Sign up here</span></p>
      </div>
    </div>
  );
};

export default LoginForm;

