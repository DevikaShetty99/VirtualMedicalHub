// src/DoctorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const DoctorDashboard = () => {
  const { id } = useParams(); // 🔁 get ID from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorAndAppointments = async () => {
      try {
        const [doctorRes, appointmentRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/doctors/${id}`),
          axios.get(`http://localhost:8080/api/appointments/doctor/${id}`)
        ]);
  
        setDoctor(doctorRes.data);
        setAppointments(appointmentRes.data);
      } catch (error) {
        console.error('Error fetching doctor or appointments:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctorAndAppointments();
  }, [id]);
  


  if (loading) return <Container><CircularProgress /></Container>;

  if (!doctor) return <Container><Typography>No doctor data found.</Typography></Container>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
        <Typography><strong>Name:</strong> {doctor.firstName} {doctor.lastName}</Typography>
        <Typography><strong>Specialization:</strong> {doctor.specialization}</Typography>
        <Typography><strong>Email:</strong> {doctor.email}</Typography>
        <Typography><strong>Phone:</strong> {doctor.phone}</Typography>
        <Typography><strong>Location:</strong> {doctor.location}</Typography>
        
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>

        {/* Appointments */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Appointments</Typography>
        {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
        ) : (
        appointments.map((appt) => (
            <Paper key={appt.id} sx={{ p: 2, mb: 2 }} elevation={2}>
            <Typography><strong>Status:</strong> {appt.status}</Typography>
            <Typography><strong>Patient:</strong> {appt.patient.name} (Age: {appt.patient.age})</Typography>
            <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
            <Typography>
                <strong>Slot:</strong> {new Date(appt.slot.startTime).toLocaleString()} - {new Date(appt.slot.endTime).toLocaleString()}
            </Typography>
        </Paper>
      ))
    )}
  </Paper>

    </Container>
  );
};

export default DoctorDashboard;
