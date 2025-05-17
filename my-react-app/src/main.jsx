// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PatientRegistration from './pages/PatientRegistration.jsx'
import DoctorRegistration from './pages/DoctorRegistration.jsx'
import AdminRegistration from './pages/AdminRegistration.jsx'
import DoctorDashboard from './pages/DoctorDashboard.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/doctor-registration" element={<DoctorRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/doctor/:id" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
