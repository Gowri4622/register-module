import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const { name } = location.state || {};


  return (
    <div>
      <h1>Welcome {name}!!!</h1>
      {/* Other content for the welcome page */}
    </div>
  );
};

export default Home;
