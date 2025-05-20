// import React, { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper
// } from '@mui/material';
// import axios from 'axios';

// const PrescriptionForm = () => {
//   const navigate = useNavigate();
//   const { id: doctorId } = useParams(); // doctor id from URL
//   const location = useLocation();
//   const { appointment, doctor, patient } = location.state || {};

//   // Initialize form state with prefilled data from appointment, patient, doctor
//   const [formData, setFormData] = useState({
//     diagnosis: '',
//     medication: '',
//     dosage: '',
//     instructions: '',
//     longDescription: '',
//     prescribedDate: new Date().toISOString().slice(0, 10), // today's date
//   });

//   if (!appointment || !doctor || !patient) {
//     return <Container><Typography>Missing appointment or user data</Typography></Container>;
//   }

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       prescribedDate: formData.prescribedDate,
//       appointment: { id: appointment.id },
//       patient: { id: patient.id },
//       doctor: { id: doctor.id },
//     };

//     try {
//       await axios.post('http://localhost:8080/api/prescriptions', payload);
//       alert('Prescription added successfully!');
//       navigate(`/doctor/${doctorId}/dashboard`); // navigate back to dashboard
//     } catch (error) {
//       console.error('Error saving prescription:', error);
//       alert('Failed to save prescription');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h5" gutterBottom>Add Prescription</Typography>

//         <Typography><strong>Patient:</strong> {patient.name} (Age: {patient.age})</Typography>
//         <Typography><strong>Doctor:</strong> {doctor.firstName} {doctor.lastName} ({doctor.specialization})</Typography>
//         <Typography><strong>Appointment Time:</strong> {new Date(appointment.slot.startTime).toLocaleString()}</Typography>
//         <Typography><strong>Symptoms:</strong> {appointment.symptoms}</Typography>

//         <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
//           <TextField
//             label="Diagnosis"
//             name="diagnosis"
//             fullWidth
//             margin="normal"
//             value={formData.diagnosis}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Medication"
//             name="medication"
//             fullWidth
//             margin="normal"
//             value={formData.medication}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Dosage"
//             name="dosage"
//             fullWidth
//             margin="normal"
//             value={formData.dosage}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             label="Instructions"
//             name="instructions"
//             fullWidth
//             margin="normal"
//             value={formData.instructions}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Long Description"
//             name="longDescription"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             value={formData.longDescription}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Prescribed Date"
//             name="prescribedDate"
//             type="date"
//             fullWidth
//             margin="normal"
//             value={formData.prescribedDate}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//             required
//           />

//           <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} >
//             Save Prescription
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default PrescriptionForm;
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const PrescriptionForm = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const location = useLocation();
  const { appointment, doctor, patient } = location.state || {};

  const [formData, setFormData] = useState({
    diagnosis: '',
    medication: '',
    dosage: '',
    instructions: '',
    longDescription: '',
    prescribedDate: new Date().toISOString().slice(0, 10),
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  if (!appointment || !doctor || !patient) {
    return <Container><Typography>Missing appointment or user data</Typography></Container>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      prescribedDate: formData.prescribedDate,
      appointment: { id: appointment.id },
      patient: { id: patient.id },
      doctor: { id: doctor.id },
    };

    try {
      await axios.post('http://localhost:8080/api/prescriptions', payload);
      setSuccessOpen(true);
      setTimeout(() => navigate(`/dashboard/doctor/${doctorId}`), 2000); // Navigate after 2s
    } catch (error) {
      console.error('Error saving prescription:Check if a priscription already exist', error);
      setErrorOpen(true); // Show retry popover
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Add Prescription</Typography>

        <Typography><strong>Patient:</strong> {patient.name} (Age: {patient.age})</Typography>
        <Typography><strong>Doctor:</strong> {doctor.firstName} {doctor.lastName} ({doctor.specialization})</Typography>
        <Typography><strong>Appointment Time:</strong> {new Date(appointment.slot.startTime).toLocaleString()}</Typography>
        <Typography><strong>Symptoms:</strong> {appointment.symptoms}</Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <TextField
            label="Diagnosis"
            name="diagnosis"
            fullWidth
            margin="normal"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
          <TextField
            label="Medication"
            name="medication"
            fullWidth
            margin="normal"
            value={formData.medication}
            onChange={handleChange}
            required
          />
          <TextField
            label="Dosage"
            name="dosage"
            fullWidth
            margin="normal"
            value={formData.dosage}
            onChange={handleChange}
            required
          />
          <TextField
            label="Instructions"
            name="instructions"
            fullWidth
            margin="normal"
            value={formData.instructions}
            onChange={handleChange}
          />
          <TextField
            label="Long Description"
            name="longDescription"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.longDescription}
            onChange={handleChange}
          />
          <TextField
            label="Prescribed Date"
            name="prescribedDate"
            type="date"
            fullWidth
            margin="normal"
            value={formData.prescribedDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} >
            Save Prescription
          </Button>
        </form>
      </Paper>

      {/* ✅ Success Snackbar */}
      <Snackbar open={successOpen} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Prescription added successfully!
        </Alert>
      </Snackbar>

      {/* ❌ Error Snackbar with Retry Suggestion */}
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Failed to save prescription. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PrescriptionForm;
