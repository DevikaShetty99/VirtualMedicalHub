import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Alert,
  Box,
  Card,
  CardContent
} from '@mui/material';
import axios from 'axios';

const CreateAppointment = () => {
  const { id } = useParams();
  const patientId = id;
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [slotCreated, setSlotCreated] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [doctorAvailability, setDoctorAvailability] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);

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

  const handleDoctorChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedDoctorId(selectedId);
    setDoctorAvailability(null);
    setAvailabilityError(null);

    const doctor = doctors.find(doc => doc.id === parseInt(selectedId));
    if (!doctor) return;

    setLoadingAvailability(true);
    try {
      const name = doctor.firstName;
      const res = await axios.get(`http://localhost:8080/api/doctors/name/${name}`);

      if (res.data.length === 0) {
        setAvailabilityError('Doctor not found');
        setDoctorAvailability(null);
      } else {
        const doctorData = res.data[0];
        if (doctorData.available === null || doctorData.available === undefined) {
          setDoctorAvailability('unknown');
        } else if (doctorData.available === true) {
          setDoctorAvailability('available');
        } else {
          setDoctorAvailability('not available');
        }
      }
    } catch (error) {
      setAvailabilityError('Failed to get availability', error);
      setDoctorAvailability(null);
    }
    setLoadingAvailability(false);
  };

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
        appointmentDateTime: slotCreated.startTime,
        symptoms
      };

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

  const selectedDoctor = doctors.find(doc => doc.id === parseInt(selectedDoctorId));

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f0f4c3' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#558b2f' }}>
          Create New Appointment
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleCreateSlot}>
          <TextField
            select
            label="Filter by Specialization"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">All Specializations</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Neurologist">Neurologist</MenuItem>
            <MenuItem value="Pediatrician">Pediatrician</MenuItem>
            <MenuItem value="Orthopedic">Orthopedic</MenuItem>
            <MenuItem value="Gynecologist">Gynecologist</MenuItem>
          </TextField>

          <TextField
            select
            label="Select Doctor"
            value={selectedDoctorId}
            onChange={handleDoctorChange}
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

          {/* Doctor Details */}
          {selectedDoctor && (
            <Card sx={{ mt: 2, mb: 2, bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6">Doctor Details</Typography>
                <Typography><strong>Experience:</strong> {selectedDoctor.experience} years</Typography>
                <Typography><strong>Education:</strong> {selectedDoctor.education}</Typography>
                <Typography><strong>Consultation Fees:</strong> ₹{selectedDoctor.fees}</Typography>
                <Typography><strong>Location:</strong> {selectedDoctor.location}</Typography>
              </CardContent>
            </Card>
          )}

          {loadingAvailability && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Checking availability...
            </Typography>
          )}

          {doctorAvailability && startTime && (
            <Typography
              variant="body1"
              color={
                doctorAvailability === 'available'
                  ? 'success.main'
                  : doctorAvailability === 'not available'
                  ? 'error.main'
                  : 'warning.main'
              }
              sx={{ mt: 1, mb: 2 }}
            >
              {(() => {
                const selectedDate = new Date(startTime).toDateString();
                const todayDate = new Date().toDateString();
                const doctorName = selectedDoctor?.firstName || 'Doctor';

                if (selectedDate === todayDate) {
                  return `Dr. ${doctorName} is ${doctorAvailability === 'available' ? '' : 'not '}available today.`;
                } else {
                  return `Dr. ${doctorName}'s availability for ${selectedDate} is not yet confirmed. You can still proceed.`;
                }
              })()}
            </Typography>
          )}

          {availabilityError && (
            <Typography variant="body1" color="error.main" sx={{ mt: 1 }}>
              {availabilityError}
            </Typography>
          )}

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
            label="Describe Your Health Issue"
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
            Confirm Appointment
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
            <strong>Doctor:</strong> Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
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
