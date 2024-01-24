// src/components/ActivationPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Activation = () => {
  const { userId } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Make a request to the backend to activate the account
        await axios.get(`http://localhost:3000/activate/${userId}`);
        alert('Account activated successfully!');
        // Redirect or perform any other actions after activation
      } catch (error) {
        console.error('Activation failed:', error);
        alert('Activation failed. Please try again.');
      }
    };

    activateAccount();
  }, [userId]);

  return (
    <div>
      <h2>Activation Page</h2>
      {/* You can add additional content if needed */}
    </div>
  );
};

export default Activation;
