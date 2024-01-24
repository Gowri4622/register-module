// Inside your Register.js file

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';  // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      // Send registration data to the backend
      await axios.post('http://localhost:3500/register', formData);
      alert('Registration successful. Check your email to activate your account.');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container"> {/* Apply the classname */}
      <h2>Registration</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" onChange={handleInputChange} />

        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default Register;
