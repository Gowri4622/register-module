// Inside your Login.js file

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/login', {
        name,
        password
      });

      alert('Login successful. Welcome!');
      console.log(name);
      navigate('/home', { state: { name } });
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        alert('Login failed. Please check your credentials.');
      } else if (error.request) {
        console.error('Network Error:', error.request);
        alert('Network error. Please try again later.');
      } else {
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container"> {/* Apply the classname */}
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />

        <label>Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
