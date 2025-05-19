// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PatientRegistration from './pages/PatientRegistration.jsx'
import DoctorRegistration from './pages/DoctorRegistration.jsx'
import AdminRegistration from './pages/AdminRegistration.jsx'
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminDoctorList from './pages/AdminDoctorList.jsx';
import AdminPatientList from './pages/AdminPatientList.jsx';
import PatientHelpManual from './pages/PatientHelpManual'
import PatientDashboard from './pages/PatientDashboard.jsx';
import CreateAppointment from './pages/CreateAppointment.jsx'

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<AdminDoctorList />} />
        <Route path="/admin/doctors" element={<AdminPatientList />} />
        <Route path="/patient-help" element={<PatientHelpManual />} />
        <Route path="/dashboard/patient/:id" element={<PatientDashboard />} />
        <Route path="/create-appointment/:id" element={<CreateAppointment />} />

      </Routes>
    </Router>
  </React.StrictMode>,
)
