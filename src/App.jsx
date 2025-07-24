import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AnalyzerPage from './pages/AnalyzerPage';
import About from './About';

import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes>
         <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/analyze"
          element={token ? <AnalyzerPage /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
