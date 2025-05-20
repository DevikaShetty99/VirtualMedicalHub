// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Paper,
//   CircularProgress,
//   Button,
//   Box,
//   Switch,
//   FormControlLabel,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   TextField,
// } from '@mui/material';
// import axios from 'axios';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const DoctorDashboard = () => {
//   const { id } = useParams(); // Doctor ID from URL
//   const [doctor, setDoctor] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [complaints, setComplaints] = useState([]);
//   const [prescriptions, setPrescriptions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isDayOpen, setIsDayOpen] = useState(false);
//   const [replyForms, setReplyForms] = useState({}); // track which complaint reply forms are open
//   const [replies, setReplies] = useState({}); // saved replies
//   const [replyTexts, setReplyTexts] = useState({}); // currently typed reply texts

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         const [doctorRes, appointmentRes, complaintRes] = await Promise.all([
//           axios.get(`http://localhost:8080/api/doctors/${id}`),
//           axios.get(`http://localhost:8080/api/appointments/doctor/${id}`),
//           axios.get(`http://localhost:8080/api/complaints/doctor/${id}`),
//         ]);

//         setDoctor(doctorRes.data);
//         setAppointments(appointmentRes.data);
//         setIsDayOpen(doctorRes.data.available);

//         // For each complaint, fetch patient info and combine it
//         const complaintsWithPatients = await Promise.all(
//           complaintRes.data.map(async (comp) => {
//             try {
//               const patientRes = await axios.get(`http://localhost:8080/api/patients/${comp.patientId}`);
//               return { ...comp, patient: patientRes.data };
//             } catch (error) {
//               console.error('Error fetching patient for complaint:', comp.id, error);
//               return { ...comp, patient: null };
//             }
//           })
//         );
//         setComplaints(complaintsWithPatients);

//         // Load saved replies from localStorage
//         const savedReplies = {};
//         complaintRes.data.forEach((comp) => {
//           const storedReply = localStorage.getItem(`reply-${comp.id}`);
//           if (storedReply) {
//             savedReplies[comp.id] = storedReply;
//           }
//         });
//         setReplies(savedReplies);

//         const prescriptionsMap = {};
//         await Promise.all(
//           appointmentRes.data.map(async (appt) => {
//             try {
//               const prescRes = await axios.get(
//                 `http://localhost:8080/api/prescriptions/appointment/${appt.id}`
//               );
//               prescriptionsMap[appt.id] = prescRes.data;
//             } catch (error) {
//               console.error('Error fetching prescription:', error);
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
//     };

//     fetchDoctorData();
//   }, [id]);

//   const handleToggleAvailability = async () => {
//     try {
//       const newStatus = !isDayOpen;
//       await axios.put(
//         `http://localhost:8080/api/doctors/${id}/availability`,
//         null,
//         { params: { available: newStatus } }
//       );
//       setIsDayOpen(newStatus);
//       localStorage.setItem(`doctor-${id}-dayStatus`, JSON.stringify(newStatus));
//     } catch (error) {
//       console.error('Error updating availability:', error);
//       alert('Failed to update availability.');
//     }
//   };

//   const toggleReplyForm = (complaintId) => {
//     setReplyForms((prev) => ({
//       ...prev,
//       [complaintId]: !prev[complaintId],
//     }));
//   };

//   const handleReplyChange = (complaintId, text) => {
//     setReplyTexts((prev) => ({
//       ...prev,
//       [complaintId]: text,
//     }));
//   };

//   const saveReply = (complaintId) => {
//     const replyText = replyTexts[complaintId];
//     if (!replyText || replyText.trim() === '') {
//       alert('Reply cannot be empty');
//       return;
//     }
//     localStorage.setItem(`reply-${complaintId}`, replyText);
//     setReplies((prev) => ({
//       ...prev,
//       [complaintId]: replyText,
//     }));
//     setReplyForms((prev) => ({
//       ...prev,
//       [complaintId]: false,
//     }));
//     setReplyTexts((prev) => ({
//       ...prev,
//       [complaintId]: '',
//     }));
//   };

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
//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() =>
//                       navigate(`/doctor/${id}/prescriptions/new`, {
//                         state: { appointment: appt, doctor, patient: appt.patient },
//                       })
//                     }
//                   >
//                     Add Prescription
//                   </Button>
//                   {prescriptions[appt.id] ? (
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       onClick={() =>
//                         navigate(`/doctor/${id}/prescriptions/view/${prescriptions[appt.id].id}`)
//                       }
//                     >
//                       View Prescription
//                     </Button>
//                   ) : (
//                     <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
//                       No prescription added
//                     </Typography>
//                   )}
//                 </Box>
//               </AccordionDetails>
//             </Accordion>
//           ))
//         )}
//       </Paper>

//       {/* Earnings */}
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h5" gutterBottom>Earnings</Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           <strong>Appointment Charge:</strong> ₹{doctor.fees}
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
//   <Typography variant="h5" gutterBottom>Complaints</Typography>
//   {complaints.length === 0 ? (
//     <Typography>No complaints found.</Typography>
//   ) : (
//     complaints.map((comp) => (
//       <Accordion key={comp.id} sx={{ mb: 2 }}>
//         <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls={`complaint-content-${comp.id}`}
//         id={`complaint-header-${comp.id}`}>
//         <Box>
//           <Typography sx={{ fontWeight: 'bold' }}>
//             {comp.patient ? comp.patient.name : 'Unknown Patient'}
//           </Typography>
//           <Typography color="text" variant="body2">
//             {comp.subject}
//           </Typography>
//         </Box>
//       </AccordionSummary>

//         <AccordionDetails>
//           <Typography sx={{ mb: 1 }}>
//             <strong>Message:</strong> {comp.message}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             <strong>Submitted:</strong> {new Date(comp.submittedAt).toLocaleString()}
//           </Typography>

//           {/* Reply Section */}
//           {replies[comp.id] && (
//             <Paper
//               elevation={1}
//               sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', borderLeft: '4px solid #1976d2' }}
//             >
//               <Typography variant="body2" color="primary">
//                 <strong>Your Reply:</strong> {replies[comp.id]}
//               </Typography>
//             </Paper>
//           )}

//           {replyForms[comp.id] ? (
//             <>
//               <TextField
//                 label="Write your reply"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={replyTexts[comp.id] || ''}
//                 onChange={(e) => handleReplyChange(comp.id, e.target.value)}
//                 sx={{ mb: 1 }}
//               />
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => saveReply(comp.id)}
//                 >
//                   Save Reply
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => toggleReplyForm(comp.id)}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => toggleReplyForm(comp.id)}
//             >
//               Reply to Patient
//             </Button>
//           )}
//         </AccordionDetails>
//       </Accordion>
//     ))
//   )}
// </Paper>
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
  Button,
  Box,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
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
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [patientHistories, setPatientHistories] = useState({});

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
        setIsDayOpen(doctorRes.data.available);

        const complaintsWithPatients = await Promise.all(
          complaintRes.data.map(async (comp) => {
            try {
              const patientRes = await axios.get(`http://localhost:8080/api/patients/${comp.patientId}`);
              return { ...comp, patient: patientRes.data };
            } catch (error) {
              console.error('Error fetching patient for complaint:', comp.id, error);
              return { ...comp, patient: null };
            }
          })
        );
        setComplaints(complaintsWithPatients);

        const savedReplies = {};
        complaintRes.data.forEach((comp) => {
          const storedReply = localStorage.getItem(`reply-${comp.id}`);
          if (storedReply) {
            savedReplies[comp.id] = storedReply;
          }
        });
        setReplies(savedReplies);

        const prescriptionsMap = {};
        await Promise.all(
          appointmentRes.data.map(async (appt) => {
            try {
              const res = await axios.get(`http://localhost:8080/api/prescriptions/appointment/${appt.id}`);
              prescriptionsMap[appt.id] = res.data;
            } catch {
              prescriptionsMap[appt.id] = null;
            }
          })
        );
        setPrescriptions(prescriptionsMap);

        const historyMap = {};
        await Promise.all(
          appointmentRes.data.map(async (appt) => {
            if (appt.patient?.id && !historyMap[appt.patient.id]) {
              try {
                const res = await axios.get(`http://localhost:8080/api/appointments/patient/${appt.patient.id}`);
                // ✅ Filter only this doctor's appointments
                const filtered = res.data.filter(a => a.doctor.id === parseInt(id));
                historyMap[appt.patient.id] = filtered;
              } catch {
                historyMap[appt.patient.id] = [];
              }
            }
          })
        );
        setPatientHistories(historyMap);

      } catch (error) {
        console.error('Error fetching data:', error);
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
      alert('Failed to update availability.', error);
    }
  };

  const toggleReplyForm = (complaintId) => {
    setReplyForms((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const handleReplyChange = (complaintId, text) => {
    setReplyTexts((prev) => ({
      ...prev,
      [complaintId]: text,
    }));
  };

  const saveReply = (complaintId) => {
    const replyText = replyTexts[complaintId];
    if (!replyText.trim()) return alert('Reply cannot be empty');
    localStorage.setItem(`reply-${complaintId}`, replyText);
    setReplies((prev) => ({ ...prev, [complaintId]: replyText }));
    setReplyForms((prev) => ({ ...prev, [complaintId]: false }));
    setReplyTexts((prev) => ({ ...prev, [complaintId]: '' }));
  };

  if (loading) return <Container><CircularProgress /></Container>;
  if (!doctor) return <Container><Typography>No doctor data found.</Typography></Container>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4">Doctor Dashboard</Typography>
        <Typography><strong>Name:</strong> {doctor.firstName} {doctor.lastName}</Typography>
        <Typography><strong>Specialization:</strong> {doctor.specialization}</Typography>
        <Typography><strong>Email:</strong> {doctor.email}</Typography>
        <Typography><strong>Phone:</strong> {doctor.phone}</Typography>
        <Typography><strong>Location:</strong> {doctor.location}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">Availability</Typography>
        <FormControlLabel
          control={<Switch checked={isDayOpen} onChange={handleToggleAvailability} />}
          label={isDayOpen ? 'Available' : 'Unavailable'}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">Appointments</Typography>
        {appointments.length === 0 ? (
          <Typography>No appointments.</Typography>
        ) : appointments.map((appt) => (
          <Accordion key={appt.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>Patient:</strong> {appt.patient?.name || 'Unknown'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Status:</strong> {appt.status}</Typography>
              <Typography><strong>Age:</strong> {appt.patient?.age}</Typography>
              <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
              <Typography><strong>Slot:</strong> {new Date(appt.slot.startTime).toLocaleString()} - {new Date(appt.slot.endTime).toLocaleString()}</Typography>
              <Typography><strong>Health History:</strong> {appt.patient?.healthHistory || 'N/A'}</Typography>

              {/* Filtered Past Appointments */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1"><strong>Past Appointments With You:</strong></Typography>
                {(patientHistories[appt.patient?.id] || []).filter(p => p.id !== appt.id).map((past, i) => (
                  <Box key={past.id} sx={{ ml: 2, mb: 1 }}>
                    <Typography variant="body2">• {new Date(past.slot.startTime).toLocaleString()} – <i>{past.symptoms}</i></Typography>
                  </Box>
                ))}
                {(patientHistories[appt.patient?.id] || []).filter(p => p.id !== appt.id).length === 0 && (
                  <Typography variant="body2" color="text.secondary">No previous history with this patient.</Typography>
                )}
              </Box>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={() =>
                  navigate(`/doctor/${id}/prescriptions/new`, { state: { appointment: appt, doctor, patient: appt.patient } })
                }>
                  Add Prescription
                </Button>
                {prescriptions[appt.id] ? (
                  <Button variant="outlined" onClick={() =>
                    navigate(`/doctor/${id}/prescriptions/view/${prescriptions[appt.id].id}`)
                  }>
                    View Prescription
                  </Button>
                ) : (
                  <Typography variant="body2" color="gray">No prescription added</Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">Earnings</Typography>
        <Typography><strong>Appointment Charge:</strong> ₹{doctor.fees}</Typography>
        <Typography><strong>Total Appointments:</strong> {appointments.length}</Typography>
        <Typography><strong>Total Earnings:</strong> ₹{appointments.length * 1000}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 6 }}>
        <Typography variant="h5">Complaints</Typography>
        {complaints.length === 0 ? (
          <Typography>No complaints.</Typography>
        ) : complaints.map((comp) => (
          <Accordion key={comp.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>{comp.patient?.name || 'Unknown'}:</strong> {comp.subject}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Message:</strong> {comp.message}</Typography>
              <Typography variant="body2"><strong>Submitted:</strong> {new Date(comp.submittedAt).toLocaleString()}</Typography>
              {replies[comp.id] && (
                <Paper elevation={1} sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5', borderLeft: '4px solid #1976d2' }}>
                  <Typography><strong>Your Reply:</strong> {replies[comp.id]}</Typography>
                </Paper>
              )}
              {replyForms[comp.id] ? (
                <>
                  <TextField
                    fullWidth
                    label="Write your reply"
                    multiline
                    rows={3}
                    value={replyTexts[comp.id] || ''}
                    onChange={(e) => handleReplyChange(comp.id, e.target.value)}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    <Button variant="contained" onClick={() => saveReply(comp.id)}>Save Reply</Button>
                    <Button variant="outlined" onClick={() => toggleReplyForm(comp.id)}>Cancel</Button>
                  </Box>
                </>
              ) : (
                <Button sx={{ mt: 2 }} variant="outlined" onClick={() => toggleReplyForm(comp.id)}>Reply to Patient</Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default DoctorDashboard;
