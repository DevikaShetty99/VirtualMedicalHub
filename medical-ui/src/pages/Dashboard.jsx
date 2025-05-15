import React from 'react';
import { jwtDecode } from 'jwt-decode';

import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <p>Please login first to access the dashboard.</p>;
  }

  let role = '';
  try {
    const decoded = jwtDecode(token);
    role = decoded.role;
  } catch (error) {
    return <p>Invalid token. Please login again.</p>;
  }

  switch (role) {
    case 'patient':
      return <PatientDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <p>Role not recognized.</p>;
  }
};

export default Dashboard;
