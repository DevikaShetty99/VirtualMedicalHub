import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider
} from '@mui/material';
import axios from 'axios';

const DoctorDashboard = () => {
  const { id } = useParams(); // Doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState({}); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const [doctorRes, appointmentRes, complaintRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/doctors/${id}`),
          axios.get(`http://localhost:8080/api/appointments/doctor/${id}`),
          axios.get(`http://localhost:8080/api/complaints/doctor/${id}`)
        ]);

        setDoctor(doctorRes.data);
        setAppointments(appointmentRes.data);
        setComplaints(complaintRes.data);
        const prescriptionsMap = {};
        await Promise.all(
          appointmentRes.data.map(async (appt) => {
            try {
              const prescRes = await axios.get(`http://localhost:8080/api/prescriptions/appointment/${appt.id}`);
              prescriptionsMap[appt.id] = prescRes.data;
            } catch (error) {
              console.error('Error fetching appointment data:', error);
              // No prescription found for appointment, set null
              prescriptionsMap[appt.id] = null;
            }
          })
        );
        setPrescriptions(prescriptionsMap);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchDoctorData();
  }, [id]);

  if (loading) return <Container><CircularProgress /></Container>;
  if (!doctor) return <Container><Typography>No doctor data found.</Typography></Container>;

  return (
    <Container maxWidth="sm">
      {/* Doctor Info */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
        <Typography><strong>Name:</strong> {doctor.firstName} {doctor.lastName}</Typography>
        <Typography><strong>Specialization:</strong> {doctor.specialization}</Typography>
        <Typography><strong>Email:</strong> {doctor.email}</Typography>
        <Typography><strong>Phone:</strong> {doctor.phone}</Typography>
        <Typography><strong>Location:</strong> {doctor.location}</Typography>
      </Paper>

      {/* Appointments */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Appointments</Typography>
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
              {/* Prescription Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate(`/doctor/${id}/prescriptions/new`, { state: { appointment: appt, doctor, patient: appt.patient } });
                }}>
                Add Prescription
              </Button>
              {prescriptions[appt.id] ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    navigate(`/doctor/${id}/prescriptions/view/${prescriptions[appt.id].id}`);
                  }}
                >
                  View Prescription
                </Button>
              ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                  No prescription added
                </Typography>
              )}
            </Box>
            </Paper>
          ))
        )}
      </Paper>

      {/* Complaints */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Complaints</Typography>
        {complaints.length === 0 ? (
          <Typography>No complaints found.</Typography>
        ) : (
          complaints.map((comp) => (
            <Paper key={comp.id} sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography variant="subtitle1"><strong>Subject:</strong> {comp.subject}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>Message:</strong> {comp.message}</Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Patient ID:</strong> {comp.patientId}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Submitted:</strong> {new Date(comp.submittedAt).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Container>
  );
};

export default DoctorDashboard;
