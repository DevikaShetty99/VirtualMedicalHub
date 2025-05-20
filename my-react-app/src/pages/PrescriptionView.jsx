// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Typography, Paper, Button, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const PrescriptionView = () => {
//   const { prescriptionId } = useParams();
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/api/prescriptions/${prescriptionId}`);
//         setPrescription(res.data);
//       } catch (error) {
//         console.error('Error fetching prescription:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescription();
//   }, [prescriptionId]);

//   const handleDownload = () => {
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prescription, null, 2));
//     const downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href", dataStr);
//     downloadAnchorNode.setAttribute("download", `prescription_${prescriptionId}.json`);
//     document.body.appendChild(downloadAnchorNode);
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   };

//   if (loading) return <Container><CircularProgress /></Container>;
//   if (!prescription) return <Container><Typography>Prescription not found.</Typography></Container>;

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>Prescription Details</Typography>
//         <Typography><strong>ID:</strong> {prescription.id}</Typography>
//         <Typography><strong>Appointment ID:</strong> {prescription.appointmentId}</Typography>
//         <Typography><strong>Doctor ID:</strong> {prescription.doctorId}</Typography>
//         <Typography><strong>Patient ID:</strong> {prescription.patientId}</Typography>
//         <Typography><strong>Medications:</strong> {prescription.medications}</Typography>
//         <Typography><strong>Notes:</strong> {prescription.notes}</Typography>
//         {/* Add other relevant fields here */}

//         <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleDownload}>
//           Download Prescription
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default PrescriptionView;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Box,
  Button,
} from '@mui/material';

const PrescriptionView = () => {
  const { prescriptionId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/prescriptions/${prescriptionId}`);
        setPrescription(res.data);
      } catch (error) {
        console.error('Error fetching prescription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

    const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prescription, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `prescription_${prescriptionId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (loading) return <Container><CircularProgress sx={{ mt: 8 }} /></Container>;

  if (!prescription) {
    return (
      <Container>
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Prescription not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32' }}>
          Prescription Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ lineHeight: 2 }}>
          <Typography><strong>ID:</strong> {prescription.id}</Typography>
          <Typography><strong>Appointment ID:</strong> {prescription.appointment_id}</Typography>
          <Typography><strong>Doctor ID:</strong> {prescription.doctor_id}</Typography>
          <Typography><strong>Patient ID:</strong> {prescription.patient_id}</Typography>
          <Typography><strong>Medications:</strong> {prescription.medication}</Typography>
          <Typography><strong>Dosage:</strong> {prescription.dosage}</Typography>
          <Typography><strong>Instructions:</strong> {prescription.instructions}</Typography>
          <Typography><strong>Notes:</strong> {prescription.long_description}</Typography>
          <Typography><strong>Diagnosis:</strong> {prescription.diagnosis}</Typography>
          <Typography><strong>Prescribed Date:</strong> {new Date(prescription.prescribed_date).toLocaleDateString()}</Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleDownload}>
           Download Prescription
    </Button>
      </Paper>
    </Container>
  );
};

export default PrescriptionView;
