import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Activation from './components/Activation';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/activate/:token' element={<Activation/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
