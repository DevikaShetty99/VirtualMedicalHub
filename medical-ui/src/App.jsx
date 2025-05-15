// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import HelpManual from './pages/HelpManual';
import Contact from './pages/Contact';
import './i18n';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help" element={<HelpManual />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
