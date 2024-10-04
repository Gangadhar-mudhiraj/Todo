import React from 'react';
import HomePage from './pages/HomePage';
import Navbar from './views/Navbar';
import SignIn from './pages/RegisterForm';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  // toast("easy");
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </Router></div>
  );
};

export default App;
