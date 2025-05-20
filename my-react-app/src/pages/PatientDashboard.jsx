import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Box,
  Button
} from '@mui/material';
import axios from 'axios';

const PatientDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const [patientRes, appointmentsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/patients/${id}`),
          axios.get(`http://localhost:8080/api/appointments/patient/${id}`)
        ]);

        const appts = appointmentsRes.data;
        setPatient(patientRes.data);
        setAppointments(appts);

        const prescMap = {};
        await Promise.all(
          appts.map(async (appt) => {
            try {
              const res = await axios.get(`http://localhost:8080/api/prescriptions/appointment/${appt.id}`);
              prescMap[appt.id] = res.data;
            } catch (error) {
              console.error('Error fetching prescription:', error);
              prescMap[appt.id] = null; // No prescription found
            }
          })
        );
        setPrescriptions(prescMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress sx={{ mt: 8 }} />
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container>
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          No patient data found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Patient Info */}
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          Patient Dashboard
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ lineHeight: 2 }}>
          <Typography><strong>Name:</strong> {patient.name}</Typography>
          <Typography><strong>Age:</strong> {patient.age}</Typography>
          <Typography><strong>Gender:</strong> {patient.gender}</Typography>
          <Typography><strong>Email:</strong> {patient.email}</Typography>
          <Typography><strong>Phone:</strong> {patient.phone}</Typography>
          <Typography><strong>Address:</strong> {patient.address || 'N/A'}</Typography>
          <Typography><strong>Health History:</strong> {patient.healthHistory}</Typography>
          <Typography><strong>Emergency Contact:</strong> {patient.emergencyContact}</Typography>
        </Box>
      </Paper>

      {/* Appointments */}
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#fff3e0' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#ef6c00' }}>
          Appointments
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {appointments.length === 0 ? (
          <Typography>No appointments found.</Typography>
        ) : (
          appointments.map((appt) => (
            <Paper
              key={appt.id}
              sx={{
                p: 2,
                mb: 2,
                borderLeft: '6px solid #42a5f5',
                backgroundColor: '#e3f2fd'
              }}
              elevation={2}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                Status: <span style={{ color: '#1976d2' }}>{appt.status}</span>
              </Typography>
              <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
              <Typography>
                <strong>Doctor:</strong> Dr. {appt.doctor.firstName} {appt.doctor.lastName} ({appt.doctor.specialization})
              </Typography>
              <Typography>
                <strong>Slot:</strong> {new Date(appt.slot.startTime).toLocaleString()} - {new Date(appt.slot.endTime).toLocaleString()}
              </Typography>
              <Typography><strong>Created:</strong> {new Date(appt.createdAt).toLocaleString()}</Typography>

              <Typography><strong>Updated:</strong> {new Date(appt.updatedAt).toLocaleString()}</Typography>

              {/* View Prescription Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                {prescriptions[appt.id] ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      navigate(`/patient/${id}/prescriptions/view/${prescriptions[appt.id].id}`)
                    }
                  >
                    View Prescription
                  </Button>
                ) : (
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                    No prescription available
                  </Typography>
                )}
              </Box>
            </Paper>
          ))
        )}
      </Paper>

      {/* Create Appointment */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <button
          onClick={() => navigate(`/create-appointment/${id}`)}
          style={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Create New Appointment
        </button>
      </Box>
    </Container>
  );
};

export default PatientDashboard;

