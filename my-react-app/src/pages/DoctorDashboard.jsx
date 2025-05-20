// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Box } from '@mui/material';
// import {
//   Container,
//   Typography,
//   Paper,
//   CircularProgress,
//   Divider,
//   Button,
//   Box,
//   Switch,
//   FormControlLabel,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import axios from 'axios';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// const DoctorDashboard = () => {
//   const { id } = useParams(); // Doctor ID from URL
//   const [doctor, setDoctor] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [prescriptions, setPrescriptions] = useState({}); 
//   const navigate = useNavigate(); 

//   // Open/Close day status
//   const [isDayOpen, setIsDayOpen] = useState(false);

//     useEffect(() => {
//       const fetchDoctorData = async () => {
//         try {
//           const [doctorRes, appointmentRes, complaintRes] = await Promise.all([
//             axios.get(`http://localhost:8080/api/doctors/${id}`),
//             axios.get(`http://localhost:8080/api/appointments/doctor/${id}`),
//             axios.get(`http://localhost:8080/api/complaints/doctor/${id}`),
//           ]);
    
//           setDoctor(doctorRes.data);
//           setAppointments(appointmentRes.data);
//           setComplaints(complaintRes.data);
    
//           // Use actual availability from DB
//           setIsDayOpen(doctorRes.data.available);
//         } catch (error) {
//           console.error('Error fetching doctor data:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       fetchDoctorData();
//     }, [id]);

//   const handleToggleAvailability = async () => {
//     try {
//       const newStatus = !isDayOpen;
  
//       await axios.put(
//         `http://localhost:8080/api/doctors/${id}/availability`,
//         null, // No body needed
//         { params: { available: newStatus } }
//       );
  
//       // Update UI and re-fetch doctor data if needed
//       setIsDayOpen(newStatus);
  
//       // Optional: still save in localStorage if needed
//       localStorage.setItem(`doctor-${id}-dayStatus`, JSON.stringify(newStatus));
//     } catch (error) {
//       console.error('Error updating availability:', error);
//       alert('Failed to update availability.');
//     }
//   };
  
//         setDoctor(doctorRes.data);
//         setAppointments(appointmentRes.data);
//         setComplaints(complaintRes.data);
//         const prescriptionsMap = {};
//         await Promise.all(
//           appointmentRes.data.map(async (appt) => {
//             try {
//               const prescRes = await axios.get(`http://localhost:8080/api/prescriptions/appointment/${appt.id}`);
//               prescriptionsMap[appt.id] = prescRes.data;
//             } catch (error) {
//               console.error('Error fetching appointment data:', error);
//               // No prescription found for appointment, set null
//               prescriptionsMap[appt.id] = null;
//             }
//           })
//         );
//         setPrescriptions(prescriptionsMap);
//       } catch (error) {
//         console.error('Error fetching doctor data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   }, [id]);

//   if (loading) return <Container><CircularProgress /></Container>;
//   if (!doctor) return <Container><Typography>No doctor data found.</Typography></Container>;

//   return (
//     <Container maxWidth="sm">
//       {/* Doctor Info */}
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
//         <Typography><strong>Name:</strong> {doctor.firstName} {doctor.lastName}</Typography>
//         <Typography><strong>Specialization:</strong> {doctor.specialization}</Typography>
//         <Typography><strong>Email:</strong> {doctor.email}</Typography>
//         <Typography><strong>Phone:</strong> {doctor.phone}</Typography>
//         <Typography><strong>Location:</strong> {doctor.location}</Typography>
//       </Paper>

//       {/* Day Open/Close Section */}
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h5" gutterBottom>Availability</Typography>
//         <FormControlLabel
//           control={<Switch checked={isDayOpen} onChange={handleToggleAvailability} color="primary" />}
//           label={isDayOpen ? 'Available' : 'Unavailable'}
//         />
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           Mark your availability for the day.
//         </Typography>
//       </Paper>

//       {/* Appointments */}
//       {/* <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h5" gutterBottom>Appointments</Typography>
//         {appointments.length === 0 ? (
//           <Typography>No appointments found.</Typography>
//         ) : (
//           appointments.map((appt) => (
//             <Paper key={appt.id} sx={{ p: 2, mb: 2 }} elevation={2}>
//               <Typography><strong>Status:</strong> {appt.status}</Typography>
//               <Typography><strong>Patient:</strong> {appt.patient.name} (Age: {appt.patient.age})</Typography>
//               <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
//               <Typography>
//                 <strong>Slot:</strong> {new Date(appt.slot.startTime).toLocaleString()} - {new Date(appt.slot.endTime).toLocaleString()}
//               </Typography>
//               {/* Prescription Button */}
//               <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   navigate(`/doctor/${id}/prescriptions/new`, { state: { appointment: appt, doctor, patient: appt.patient } });
//                 }}>
//                 Add Prescription
//               </Button>
//               {prescriptions[appt.id] ? (
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => {
//                     navigate(`/doctor/${id}/prescriptions/view/${prescriptions[appt.id].id}`);
//                   }}
//                 >
//                   View Prescription
//                 </Button>
//               ) : (
//                 <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
//                   No prescription added
//                 </Typography>
//               )}
//             </Box>
//             </Paper>
//           ))
//         )}
//       </Paper> }

//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h5" gutterBottom>Appointments</Typography>

//         {appointments.length === 0 ? (
//           <Typography>No appointments found.</Typography>
//         ) : (
//           appointments.map((appt) => (
//             <Accordion key={appt.id} sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography><strong>Patient:</strong> {appt.patient.name}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography><strong>Status:</strong> {appt.status}</Typography>
//                 <Typography><strong>Age:</strong> {appt.patient.age}</Typography>
//                 <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
//                 <Typography>
//                   <strong>Slot:</strong>{' '}
//                   {new Date(appt.slot.startTime).toLocaleString()} -{' '}
//                   {new Date(appt.slot.endTime).toLocaleString()}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))
//         )}
//       </Paper>

//       {/* Commission Section */}
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//       <Typography variant="h5" gutterBottom>Earnings</Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           <strong>Appointment Charge:</strong> ₹1000
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           <strong>Total Appointments:</strong> {appointments.length}
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           <strong>Total Earnings:</strong> ₹{appointments.length * 1000}
//         </Typography>
//       </Paper>


//       {/* Complaints */}
//       <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5 }}>
//         <Typography variant="h5" gutterBottom>Complaints</Typography>
//         {complaints.length === 0 ? (
//           <Typography>No complaints found.</Typography>
//         ) : (
//           complaints.map((comp) => (
//             <Paper key={comp.id} sx={{ p: 2, mb: 2 }} elevation={2}>
//               <Typography variant="subtitle1"><strong>Subject:</strong> {comp.subject}</Typography>
//               <Typography variant="body1" sx={{ mb: 1 }}><strong>Message:</strong> {comp.message}</Typography>
//               {/* <Typography variant="body2" color="textSecondary">
//                 <strong>Patient ID:</strong> {comp.patientId}
//               </Typography> */}
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Submitted:</strong> {new Date(comp.submittedAt).toLocaleString()}
//               </Typography>
//             </Paper>
//           ))
//         )}
//       </Paper>


//     </Container>
//   );
// };

// export default DoctorDashboard;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DoctorDashboard = () => {
  const { id } = useParams(); // Doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const [doctorRes, appointmentRes, complaintRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/doctors/${id}`),
          axios.get(`http://localhost:8080/api/appointments/doctor/${id}`),
          axios.get(`http://localhost:8080/api/complaints/doctor/${id}`),
        ]);

        setDoctor(doctorRes.data);
        setAppointments(appointmentRes.data);
        setComplaints(complaintRes.data);
        setIsDayOpen(doctorRes.data.available);

        const prescriptionsMap = {};
        await Promise.all(
          appointmentRes.data.map(async (appt) => {
            try {
              const prescRes = await axios.get(
                `http://localhost:8080/api/prescriptions/appointment/${appt.id}`
              );
              prescriptionsMap[appt.id] = prescRes.data;
            } catch (error) {
              console.error('Error fetching prescription:', error);
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

  const handleToggleAvailability = async () => {
    try {
      const newStatus = !isDayOpen;
      await axios.put(
        `http://localhost:8080/api/doctors/${id}/availability`,
        null,
        { params: { available: newStatus } }
      );
      setIsDayOpen(newStatus);
      localStorage.setItem(`doctor-${id}-dayStatus`, JSON.stringify(newStatus));
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability.');
    }
  };

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

      {/* Day Open/Close Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Availability</Typography>
        <FormControlLabel
          control={<Switch checked={isDayOpen} onChange={handleToggleAvailability} color="primary" />}
          label={isDayOpen ? 'Available' : 'Unavailable'}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Mark your availability for the day.
        </Typography>
      </Paper>

      {/* Appointments */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Appointments</Typography>
        {appointments.length === 0 ? (
          <Typography>No appointments found.</Typography>
        ) : (
          appointments.map((appt) => (
            <Accordion key={appt.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography><strong>Patient:</strong> {appt.patient.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>Status:</strong> {appt.status}</Typography>
                <Typography><strong>Age:</strong> {appt.patient.age}</Typography>
                <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
                <Typography>
                  <strong>Slot:</strong>{' '}
                  {new Date(appt.slot.startTime).toLocaleString()} -{' '}
                  {new Date(appt.slot.endTime).toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/doctor/${id}/prescriptions/new`, {
                        state: { appointment: appt, doctor, patient: appt.patient },
                      })
                    }
                  >
                    Add Prescription
                  </Button>
                  {prescriptions[appt.id] ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        navigate(`/doctor/${id}/prescriptions/view/${prescriptions[appt.id].id}`)
                      }
                    >
                      View Prescription
                    </Button>
                  ) : (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                      No prescription added
                    </Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Paper>

      {/* Earnings */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Earnings</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Appointment Charge:</strong> ₹1000
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Total Appointments:</strong> {appointments.length}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Total Earnings:</strong> ₹{appointments.length * 1000}
        </Typography>
      </Paper>

      {/* Complaints */}
      <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5 }}>
        <Typography variant="h5" gutterBottom>Complaints</Typography>
        {complaints.length === 0 ? (
          <Typography>No complaints found.</Typography>
        ) : (
          complaints.map((comp) => (
            <Paper key={comp.id} sx={{ p: 2, mb: 2 }} elevation={2}>
              <Typography variant="subtitle1"><strong>Subject:</strong> {comp.subject}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>Message:</strong> {comp.message}</Typography>
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
