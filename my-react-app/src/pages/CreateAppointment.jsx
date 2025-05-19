import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateAppointment = () => {
  // const { patientId } = useParams();
  const { id } = useParams();
  const patientId = id; 
  const navigate = useNavigate();  
  const [doctors, setDoctors] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [slotCreated, setSlotCreated] = useState(null); // holds slot response
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/doctors');
        setDoctors(res.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId || !startTime || !endTime || !symptoms) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const slotPayload = {
        doctorId: selectedDoctorId,
        startTime,
        endTime
      };
      console.log('Creating slot with payload:', slotPayload);

      const slotResponse = await axios.post('http://localhost:8080/api/slots', slotPayload);

      setSlotCreated(slotResponse.data);
      setOpenConfirmDialog(true);
    } catch (error) {
      console.error('Error creating slot:', error);
      alert('Failed to create slot. Please try again.');
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      const appointmentPayload = {
        patientId: parseInt(patientId),
        doctorId: selectedDoctorId,
        appointmentDateTime: slotCreated.startTime,//new Date(slotCreated.startTime).toISOString(),
        symptoms
      };
      console.log('Confirming appointment with payload:', appointmentPayload);

      await axios.post('http://localhost:8080/api/appointments', appointmentPayload);

      alert('Appointment successfully created!');
      setSelectedDoctorId('');
      setStartTime('');
      setEndTime('');
      setSymptoms('');
      setSlotCreated(null);
      setOpenConfirmDialog(false);
      navigate(`/dashboard/patient/${patientId}`);
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please try again.');
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setSlotCreated(null);
  };

  const filteredDoctors = specializationFilter
    ? doctors.filter((doc) =>
        doc.specialization.toLowerCase().includes(specializationFilter.toLowerCase())
      )
    : doctors;

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f0f4c3' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#558b2f' }}>
          Create New Appointment
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleCreateSlot}>
          <TextField
            label="Filter by Specialization"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Select Doctor"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            {filteredDoctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                Dr. {doc.firstName} {doc.lastName} ({doc.specialization})
              </MenuItem>
            ))}
          </TextField>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>

          <TextField
            label="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Slot & Confirm Appointment
          </Button>
        </form>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Slot created successfully. Do you want to confirm this appointment?
          </Alert>
          <Typography>
            <strong>Doctor:</strong> {
              doctors.find(d => d.id === parseInt(selectedDoctorId))?.firstName
            } {
              doctors.find(d => d.id === parseInt(selectedDoctorId))?.lastName
            }
          </Typography>
          <Typography>
            <strong>Time:</strong> {new Date(slotCreated?.startTime).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Symptoms:</strong> {symptoms}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button onClick={handleConfirmAppointment} color="primary" variant="contained">
            Confirm Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateAppointment;
