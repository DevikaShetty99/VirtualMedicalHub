// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Paper,
//   CircularProgress,
//   Divider,
//   Box,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   TextField,
//   MenuItem,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';

// const PatientDashboard = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [patient, setPatient] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [prescriptions, setPrescriptions] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [complaintFormVisible, setComplaintFormVisible] = useState(false);
//   const [complaint, setComplaint] = useState({ doctorId: '', subject: '', message: '' });
//   const [complaintsList, setComplaintsList] = useState([]);
//   const [submittingComplaint, setSubmittingComplaint] = useState(false);
//   const [complaintSuccess, setComplaintSuccess] = useState(false);
//   const [complaintError, setComplaintError] = useState('');

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const [patientRes, appointmentsRes] = await Promise.all([
//           axios.get(`http://localhost:8080/api/patients/${id}`),
//           axios.get(`http://localhost:8080/api/appointments/patient/${id}`)
//         ]);

//         const appts = appointmentsRes.data;
//         setPatient(patientRes.data);
//         setAppointments(appts);

//         const prescMap = {};
//         await Promise.all(
//           appts.map(async (appt) => {
//             try {
//               const res = await axios.get(`http://localhost:8080/api/prescriptions/appointment/${appt.id}`);
//               prescMap[appt.id] = res.data;
//             } catch (error) {
//               prescMap[appt.id] = null;
//               console.error('Error fetching prescription:', error);
//             }
//           })
//         );
//         setPrescriptions(prescMap);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [id]);

//   const uniqueDoctors = Array.from(
//     new Map(appointments.map(appt => [appt.doctor.id, appt.doctor])).values()
//   );

//   const handleComplaintSubmit = async () => {
//     const { doctorId, subject, message } = complaint;
//     if (!doctorId || !subject || !message) {
//       setComplaintError('Please fill in all fields.');
//       return;
//     }

//     setSubmittingComplaint(true);
//     try {
//       const res = await axios.post('http://localhost:8080/api/complaints', {
//         patientId: parseInt(id),
//         doctorId: parseInt(doctorId),
//         subject,
//         message
//       });

//       const doctor = uniqueDoctors.find((doc) => doc.id === parseInt(doctorId));
//       setComplaintsList((prev) => [
//         ...prev,
//         {
//           id: res.data.id,
//           doctor,
//           subject: res.data.subject,
//           message: res.data.message,
//           submittedAt: res.data.submittedAt
//         }
//       ]);

//       setComplaintSuccess(true);
//       setComplaintFormVisible(false);
//       setComplaint({ doctorId: '', subject: '', message: '' });
//       setComplaintError('');
//     } catch (err) {
//       console.error(err);
//       setComplaintError('Failed to submit complaint. Try again.');
//     } finally {
//       setSubmittingComplaint(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container>
//         <CircularProgress sx={{ mt: 8 }} />
//       </Container>
//     );
//   }

//   if (!patient) {
//     return (
//       <Container>
//         <Typography variant="h6" color="error" sx={{ mt: 5 }}>
//           No patient data found.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       {/* Patient Info */}
//       <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f9f9f9' }}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
//           Patient Dashboard
//         </Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Box sx={{ lineHeight: 2 }}>
//           <Typography><strong>Name:</strong> {patient.name}</Typography>
//           <Typography><strong>Age:</strong> {patient.age}</Typography>
//           <Typography><strong>Gender:</strong> {patient.gender}</Typography>
//           <Typography><strong>Email:</strong> {patient.email}</Typography>
//           <Typography><strong>Phone:</strong> {patient.phone}</Typography>
//           <Typography><strong>Address:</strong> {patient.address || 'N/A'}</Typography>
//           <Typography><strong>Health History:</strong> {patient.healthHistory}</Typography>
//           <Typography><strong>Emergency Contact:</strong> {patient.emergencyContact}</Typography>
//         </Box>
//       </Paper>

//       {/* Appointments */}
//       <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#fff3e0' }}>
//         <Typography variant="h5" gutterBottom sx={{ color: '#ef6c00' }}>
//           Appointments
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         {appointments.length === 0 ? (
//           <Typography>No appointments found.</Typography>
//         ) : (
//           appointments.map((appt) => {
//             const doctor = appt.doctor;
//             const slotStart = new Date(appt.slot.startTime).toLocaleString();
//             const slotEnd = new Date(appt.slot.endTime).toLocaleString();
//             const presc = prescriptions[appt.id];

//             return (
//               <Accordion key={appt.id} sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <Box>
//                     <Typography sx={{ fontWeight: 'bold' }}>
//                       Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialization})
//                     </Typography>
//                     <Typography variant="body2">
//                       Slot: {slotStart} - {slotEnd}
//                     </Typography>
//                     <Typography sx={{ fontWeight: 'bold' }}>
//                       Status:{' '}
//                       <span style={{ color: presc ? '#2e7d32' : '#0096FF' }}>
//                         {presc ? 'Completed' : 'Scheduled'}
//                       </span>
//                     </Typography>
//                   </Box>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
//                   <Typography><strong>Created:</strong> {new Date(appt.createdAt).toLocaleString()}</Typography>
//                   <Typography><strong>Updated:</strong> {new Date(appt.updatedAt).toLocaleString()}</Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
//                     {presc ? (
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={() =>
//                           navigate(`/patient/${id}/prescriptions/view/${presc.id}`)
//                         }
//                       >
//                         View Prescription
//                       </Button>
//                     ) : (
//                       <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
//                         No prescription available
//                       </Typography>
//                     )}
//                   </Box>
//                 </AccordionDetails>
//               </Accordion>
//             );
//           })
//         )}
//         {/* Create Appointment */}
//         <Box textAlign="center" sx={{ mt: 4 }}>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#1976d2' }}
//             onClick={() => navigate(`/create-appointment/${id}`)}
//           >
//             Create New Appointment
//           </Button>
//         </Box>
//       </Paper>

//       {/* Complaint Section */}
//       <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f3e5f5' }}>
//         <Typography variant="h5" gutterBottom sx={{ color: '#7b1fa2' }}>
//           Complaints
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         <Box sx={{ mb: 2 }}>
//           <Button variant="outlined" color="secondary" onClick={() => setComplaintFormVisible(!complaintFormVisible)}>
//             {complaintFormVisible ? 'Cancel' : 'Create New Complaint'}
//           </Button>
//         </Box>

//         {complaintFormVisible && (
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               select
//               label="Select Doctor"
//               fullWidth
//               margin="normal"
//               value={complaint.doctorId}
//               onChange={(e) => setComplaint({ ...complaint, doctorId: e.target.value })}
//             >
//               {uniqueDoctors.map((doc) => (
//                 <MenuItem key={doc.id} value={doc.id}>
//                   Dr. {doc.firstName} {doc.lastName} ({doc.specialization})
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               label="Subject"
//               fullWidth
//               margin="normal"
//               value={complaint.subject}
//               onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
//             />

//             <TextField
//               label="Message"
//               fullWidth
//               margin="normal"
//               multiline
//               minRows={3}
//               value={complaint.message}
//               onChange={(e) => setComplaint({ ...complaint, message: e.target.value })}
//             />

//             <Box sx={{ textAlign: 'right', mt: 2 }}>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleComplaintSubmit}
//                 disabled={submittingComplaint}
//               >
//                 {submittingComplaint ? 'Submitting...' : 'Submit Complaint'}
//               </Button>
//             </Box>
//           </Box>
//         )}

//         {/* Complaints List */}
//         {complaintsList.map((comp) => (
//           <Accordion key={comp.id} sx={{ mb: 2, bgcolor: '#ede7f6' }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box>
//                 <Typography sx={{ fontWeight: 'bold' }}>{comp.subject}</Typography>
//                 <Typography variant="body2">
//                   Dr. {comp.doctor.firstName} {comp.doctor.lastName}
//                 </Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>{comp.message}</Typography>
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Paper>

//       {/* Snackbar Feedback */}
//       <Snackbar open={complaintSuccess} autoHideDuration={4000} onClose={() => setComplaintSuccess(false)}>
//         <Alert onClose={() => setComplaintSuccess(false)} severity="success" sx={{ width: '100%' }}>
//           Complaint submitted successfully!
//         </Alert>
//       </Snackbar>

//       <Snackbar open={!!complaintError} autoHideDuration={4000} onClose={() => setComplaintError('')}>
//         <Alert onClose={() => setComplaintError('')} severity="error" sx={{ width: '100%' }}>
//           {complaintError}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PatientDashboard;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const PatientDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  const [complaintFormVisible, setComplaintFormVisible] = useState(false);
  const [complaint, setComplaint] = useState({ doctorId: '', subject: '', message: '' });
  const [complaintsList, setComplaintsList] = useState([]);
  const [submittingComplaint, setSubmittingComplaint] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);
  const [complaintError, setComplaintError] = useState('');

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
              prescMap[appt.id] = null;
              console.error('Error fetching prescription:', error);
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

  const uniqueDoctors = Array.from(
    new Map(appointments.map(appt => [appt.doctor.id, appt.doctor])).values()
  );

  const handleComplaintSubmit = async () => {
    const { doctorId, subject, message } = complaint;
    if (!doctorId || !subject || !message) {
      setComplaintError('Please fill in all fields.');
      return;
    }

    setSubmittingComplaint(true);
    try {
      const res = await axios.post('http://localhost:8080/api/complaints', {
        patientId: parseInt(id),
        doctorId: parseInt(doctorId),
        subject,
        message
      });

      const doctor = uniqueDoctors.find((doc) => doc.id === parseInt(doctorId));
      setComplaintsList((prev) => [
        ...prev,
        {
          id: res.data.id,
          doctor,
          subject: res.data.subject,
          message: res.data.message,
          submittedAt: res.data.submittedAt
        }
      ]);

      setComplaintSuccess(true);
      setComplaintFormVisible(false);
      setComplaint({ doctorId: '', subject: '', message: '' });
      setComplaintError('');
    } catch (err) {
      console.error(err);
      setComplaintError('Failed to submit complaint. Try again.');
    } finally {
      setSubmittingComplaint(false);
    }
  };

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
  <>
        <Box sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          display: 'flex',
          gap: 1,
        }}>
          <Button variant="outlined" onClick={() => navigate('/')}>Home</Button>
        </Box>

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
          appointments.map((appt) => {
            const doctor = appt.doctor;
            const slotStart = new Date(appt.slot.startTime).toLocaleString();
            const slotEnd = new Date(appt.slot.endTime).toLocaleString();
            const presc = prescriptions[appt.id];

            return (
              <Accordion key={appt.id} sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                    </Typography>
                    <Typography variant="body2">
                      Slot: {slotStart} - {slotEnd}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Status:{' '}
                      <span style={{ color: presc ? '#2e7d32' : '#0096FF' }}>
                        {presc ? 'Completed' : 'Scheduled'}
                      </span>
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
                  <Typography><strong>Created:</strong> {new Date(appt.createdAt).toLocaleString()}</Typography>
                  <Typography><strong>Updated:</strong> {new Date(appt.updatedAt).toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    {presc ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          navigate(`/patient/${id}/prescriptions/view/${presc.id}`)
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
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1976d2' }}
            onClick={() => navigate(`/create-appointment/${id}`)}
          >
            Create New Appointment
          </Button>
        </Box>
      </Paper>

      {/* Lab Reports */}
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#e8f5e9' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32' }}>
          Lab Reports
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Typography><strong>Report Name:</strong> Blood Test Report</Typography>
          <Typography><strong>Date:</strong> 2025-05-10</Typography>
          <Typography><strong>Summary:</strong> All values within normal range.</Typography>
          <Button
            variant="outlined"
            color="success"
            sx={{ mt: 2 }}
            onClick={() => window.open('/mock-lab-report.pdf', '_blank')}
          >
            Download PDF
          </Button>
        </Box>
      </Paper>

      {/* Billing Info */}
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#fffde7' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#fbc02d' }}>
          Billing Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Typography><strong>Last Payment:</strong> ₹1,200</Typography>
          <Typography><strong>Date:</strong> 2025-05-15</Typography>
          <Typography><strong>Status:</strong> Paid</Typography>
        </Box>
      </Paper>

      {/* Complaint Section */}
      <Paper elevation={4} sx={{ p: 4, mt: 5, bgcolor: '#f3e5f5' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#7b1fa2' }}>
          Complaints
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => setComplaintFormVisible(!complaintFormVisible)}>
            {complaintFormVisible ? 'Cancel' : 'Create New Complaint'}
          </Button>
        </Box>

        {complaintFormVisible && (
          <Box sx={{ mb: 3 }}>
            <TextField
              select
              label="Select Doctor"
              fullWidth
              margin="normal"
              value={complaint.doctorId}
              onChange={(e) => setComplaint({ ...complaint, doctorId: e.target.value })}
            >
              {uniqueDoctors.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  Dr. {doc.firstName} {doc.lastName} ({doc.specialization})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={complaint.subject}
              onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
            />

            <TextField
              label="Message"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              value={complaint.message}
              onChange={(e) => setComplaint({ ...complaint, message: e.target.value })}
            />

            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleComplaintSubmit}
                disabled={submittingComplaint}
              >
                {submittingComplaint ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            </Box>
          </Box>
        )}

        {complaintsList.map((comp) => (
          <Accordion key={comp.id} sx={{ mb: 2, bgcolor: '#ede7f6' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>{comp.subject}</Typography>
                <Typography variant="body2">
                  Dr. {comp.doctor.firstName} {comp.doctor.lastName}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{comp.message}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Snackbar Feedback */}
      <Snackbar open={complaintSuccess} autoHideDuration={4000} onClose={() => setComplaintSuccess(false)}>
        <Alert onClose={() => setComplaintSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Complaint submitted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={!!complaintError} autoHideDuration={4000} onClose={() => setComplaintError('')}>
        <Alert onClose={() => setComplaintError('')} severity="error" sx={{ width: '100%' }}>
          {complaintError}
        </Alert>
      </Snackbar>
    </Container>
  </>
  );
};

export default PatientDashboard;
