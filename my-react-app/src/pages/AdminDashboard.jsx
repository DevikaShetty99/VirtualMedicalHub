import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctorListExpanded, setDoctorListExpanded] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editDoctorData, setEditDoctorData] = useState({});

  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [showPatients, setShowPatients] = useState(false);
  const [patientListExpanded, setPatientListExpanded] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editPatientData, setEditPatientData] = useState({});

  const [reportListExpanded, setReportListExpanded] = useState(true);
  const [showReports, setShowReports] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [patientAgeGroupData, setPatientAgeGroupData] = useState([]);
  const reportRef = useRef();

  const [showComplaints, setShowComplaints] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintListExpanded, setComplaintListExpanded] = useState(true);
  const [sentComplaints, setSentComplaints] = useState(new Set());

  // New state for the feedback section
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackListExpanded, setFeedbackListExpanded] = useState(true);
  const [feedback, setFeedback] = useState([]);
  // const [feedbackResponse, setFeedbackResponse] = useState({});

  useEffect(() => {
    const storedFeedback = localStorage.getItem("appFeedbacks");
    if (storedFeedback) {
      try {
        setFeedback(JSON.parse(storedFeedback));
      } catch (err) {
        console.error("Failed to parse feedback from localStorage", err);
      }
    }
  }, []);

  const toggleFeedback = () => {
    setShowFeedback((prev) => !prev);
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/doctors");
      const data = await res.json();
      setDoctors(data);
      setShowDoctors(true);
      setExpandedDoctorId(null);
      setDoctorListExpanded(true);
    } catch (error) {
      alert("Failed to fetch doctors: " + error.message);
    }
  };

  const fetchDoctorDetails = async (doctorId) => {
    const res = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
    return await res.json();
  };

  const toggleDoctor = async (doctorId) => {
    if (expandedDoctorId === doctorId) {
      setExpandedDoctorId(null);
    } else {
      const detailed = await fetchDoctorDetails(doctorId);
      setDoctors((prev) =>
        prev.map((doc) => (doc.id === doctorId ? { ...doc, ...detailed } : doc))
      );
      setExpandedDoctorId(doctorId);
      setEditingDoctorId(null); // close any editing form
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctorId(doctor.id);
    setEditDoctorData({
      email: doctor.email,
      phone: doctor.phone,
      location: doctor.location,
    });
  };

  const handlePatientEditClick = (patient) => {
    setEditingPatientId(patient.id);
    setEditPatientData({
      phone: patient.phone || '',
      address: patient.address || '',
      healthHistory: patient.healthHistory || '',
      emergencyContact: patient.emergencyContact || '',
    });
  };

  const handleDoctorEditChange = (field, value) => {
    setEditDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePatientEditChange = (field, value) => {
    setEditPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDoctorUpdate = async (doctorId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDoctorData),
      });
      if (!res.ok) throw new Error(await res.text());

      const updatedDoctor = await res.json();
      setDoctors((prev) =>
        prev.map((doc) => (doc.id === doctorId ? { ...doc, ...updatedDoctor } : doc))
      );
      setEditingDoctorId(null);
      alert("Doctor profile updated.");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const toggleDoctorListExpand = () => setDoctorListExpanded((prev) => !prev);


  const handlePatientUpdate = async (patientId) => {
    try {   
        const res = await fetch(`http://localhost:8080/api/patients/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPatientData),
        });
        if (!res.ok) throw new Error(await res.text());
        const updatedPatient = await res.json();
        setPatients((prev) =>
        prev.map((pat) => (pat.id === patientId ? { ...pat, ...updatedPatient } : pat))
        );
        setEditingPatientId(null);
        alert("Patient profile updated.");
    } catch (err) {
        alert("Update failed: " + err.message);

    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/patients");
      const data = await res.json();
      setPatients(data);
      setShowPatients(true);
      setExpandedPatientId(null);
      setPatientListExpanded(true);
    } catch (error) {
      alert("Failed to fetch patients: " + error.message);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    const res = await fetch(`http://localhost:8080/api/patients/${patientId}`);
    return await res.json();
  };

  const togglePatient = async (patientId) => {
    if (expandedPatientId === patientId) {
      setExpandedPatientId(null);
    } else {
      const detailed = await fetchPatientDetails(patientId);
      setPatients((prev) =>
        prev.map((pat) => (pat.id === patientId ? { ...pat, ...detailed } : pat))
      );
      setExpandedPatientId(patientId);
    }
  };

  const togglePatientListExpand = () => setPatientListExpanded((prev) => !prev);

  const toggleReportListExpand = () => setReportListExpanded((prev) => !prev);

  const prepareReportData = async () => {
    try {
      const [doctorsRes, patientsRes] = await Promise.all([
        fetch("http://localhost:8080/api/doctors"),
        fetch("http://localhost:8080/api/patients"),
      ]);
      const doctorsData = await doctorsRes.json();
      const patientsData = await patientsRes.json();

      const patientCountByDoctor = {};
      for (const patient of patientsData) {
        if (patient.doctorId) {
          patientCountByDoctor[patient.doctorId] =
            (patientCountByDoctor[patient.doctorId] || 0) + 1;
        }
      }

      const chartData = doctorsData.map((doc) => ({
        name: `${doc.firstName} ${doc.lastName}`,
        PatientsHandled: patientCountByDoctor[doc.id] || 0,
      }));

      const ageGroups = { "0-18": 0, "19-35": 0, "36-60": 0, "60+": 0 };
      patientsData.forEach((pat) => {
        const age = pat.age || 0;
        if (age <= 18) ageGroups["0-18"]++;
        else if (age <= 35) ageGroups["19-35"]++;
        else if (age <= 60) ageGroups["36-60"]++;
        else ageGroups["60+"]++;
      });

      const ageGroupChartData = Object.entries(ageGroups).map(([group, count]) => ({
        ageGroup: group,
        count,
      }));

      setDoctors(doctorsData);
      setPatients(patientsData);
      setReportData(chartData);
      setPatientAgeGroupData(ageGroupChartData);
      setShowReports(true);
      setReportListExpanded(true);
    } catch (error) {
      alert("Failed to generate report: " + error.message);
    }
  };

  const downloadReport = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    });
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/complaints");
      const data = await res.json();
      setComplaints(data);
      setShowComplaints(true);
    } catch (error) {
      alert("Failed to fetch complaints: " + error.message);
    }
  };

  const toggleComplaints = () => {
    if (!showComplaints) fetchComplaints();
    else setShowComplaints(false);
  };

  const sendComplaintToDoctor = async (complaint) => {
    try {
      const payload = {
        patientId: complaint.patientId || 1,
        doctorId: complaint.doctorId || 7,
        subject: complaint.subject,
        message: complaint.message,
        submittedAt: new Date().toISOString(),
      };
      const res = await fetch("http://localhost:8080/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSentComplaints((prev) => {
          const updated = new Set(prev).add(complaint.id);
          localStorage.setItem("sentComplaints", JSON.stringify([...updated]));
          return updated;
        });
      } else {
        const error = await res.text();
        alert("Failed to send complaint: " + error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

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

    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Welcome, Admin
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage doctors, patients, reports, complaints, and feedback from here.
          </Typography>
        </Box>
      </Paper>

      {/* Doctors */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={fetchDoctors}>
            View Doctors
          </Button>
          {showDoctors && (
            <IconButton onClick={toggleDoctorListExpand}>
              {doctorListExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
            </IconButton>
          )}
        </Box>

        {showDoctors && doctorListExpanded && (
          <List>
            {doctors.map((doc) => (
              <React.Fragment key={doc.id}>
                <ListItem button onClick={() => toggleDoctor(doc.id)}>
                  <ListItemText
                    primary={`${doc.firstName} ${doc.lastName}`}
                    secondary={doc.specialization}
                  />
                  {expandedDoctorId === doc.id ? (
                    <ExpandLessIcon color="action" />
                  ) : (
                    <ExpandMoreIcon color="action" />
                  )}
                </ListItem>
                <Collapse in={expandedDoctorId === doc.id} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 4, pr: 4, pb: 2 }}>
                    <Typography>Email: {doc.email}</Typography>
                    <Typography>Phone: {doc.phone}</Typography>
                    <Typography>Location: {doc.location}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleEditClick(doc)}
                    >
                      Update Doctor Profile
                    </Button>
                    {editingDoctorId === doc.id && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={editDoctorData.phone}
                          onChange={(e) => handleDoctorEditChange("phone", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Location"
                          value={editDoctorData.location}
                          onChange={(e) => handleDoctorEditChange("location", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDoctorUpdate(doc.id)}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Collapse>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Patients */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" onClick={fetchPatients}>
            View Patients
        </Button>
        {showPatients && (
            <IconButton onClick={togglePatientListExpand}>
            {patientListExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
            </IconButton>
        )}
        </Box>


        {showPatients && patientListExpanded && (
          <List>
          {patients.map((patient) => (
            <React.Fragment key={patient.id}>
              <ListItem button onClick={() => togglePatient(patient.id)}>
                <ListItemText
                  primary={patient.name}       // Use .name here
                  secondary={`Age: ${patient.age}, Gender: ${patient.gender}`}
                />
                {expandedPatientId === patient.id ? (
                  <ExpandLessIcon color="action" />
                ) : (
                  <ExpandMoreIcon color="action" />
                )}
              </ListItem>
              <Collapse in={expandedPatientId === patient.id} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4, pr: 4, pb: 2 }}>
                  <Typography>Email: {patient.email}</Typography>
                  <Typography>Phone: {patient.phone}</Typography>
                  <Typography>Address: {patient.address}</Typography>
                  <Typography>Health History: {patient.healthHistory}</Typography>
                  <Typography>Emergency Contact: {patient.emergencyContact}</Typography>
                  <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handlePatientEditClick(patient)}
                    >
                      Update Patient Profile
                    </Button>
                    {editingPatientId === patient.id && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={editPatientData.phone}
                          onChange={(e) => handlePatientEditChange("phone", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Address"
                          value={editPatientData.address}
                          onChange={(e) => handlePatientEditChange("address", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Health History"
                          value={editPatientData.healthHistory}
                          onChange={(e) => handlePatientEditChange("healthHistory", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Emergency Contact"
                          value={editPatientData.emergencyContact}
                          onChange={(e) => handlePatientEditChange("emergencyContact", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePatientUpdate(patient.id)}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                </Box>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        )}
      </Paper>

      {/* Report Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }} ref={reportRef}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="info" onClick={prepareReportData}>
            Generate Report
        </Button>
        {showReports && (
            <>
            <Button variant="outlined" onClick={downloadReport}>
                Download PDF
            </Button>
            <IconButton onClick={toggleReportListExpand}>
                {reportListExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
            </IconButton>
            </>
        )}
        </Box>

        {showReports && reportListExpanded && (
          <>
            <Typography variant="h5" gutterBottom>
              Patients Handled per Doctor
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="PatientsHandled" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Patient Age Group Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientAgeGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#388e3c" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </Paper>

      {/* Complaints Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="error" onClick={toggleComplaints}>
              View Complaints
            </Button>
            {showComplaints && (
            <IconButton onClick={() => setComplaintListExpanded(prev => !prev)}>
                {complaintListExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
            </IconButton>
            )}
        </Box>

        {showComplaints && (
          <Collapse in={complaintListExpanded}>
            <Typography variant="h4" gutterBottom>
              Complaints and Grievances
            </Typography>
            {complaints.length === 0 ? (
              <Typography>No complaints available.</Typography>
            ) : (
              <List>
                {complaints.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="h6">{item.subject}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(item.submittedAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography variant="body1" gutterBottom>
                              {item.message}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Patient:</strong> {item.patientName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Doctor:</strong> {item.doctorName} ({item.doctorEmail})
                            </Typography>
                          </>
                        }
                      />
                      {sentComplaints.has(item.id) ? (
                        <Button size="small" variant="contained" color="success" disabled>
                            Sent
                        </Button>
                        ) : (
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => sendComplaintToDoctor(item)}>
                            Send to Doctor
                        </Button>
                      )}
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Collapse>
        )}
      </Paper>

      {/* New Feedback Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={toggleFeedback}>
          View Feedback
        </Button>
        {showFeedback && (
          <IconButton onClick={() => setFeedbackListExpanded((prev) => !prev)}>
            {feedbackListExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </IconButton>
        )}
      </Box>

      {showFeedback && (
        <Collapse in={feedbackListExpanded}>
          <Typography variant="h4" gutterBottom>
            User Feedback
          </Typography>

          {feedback.length === 0 ? (
            <Typography>No feedback available.</Typography>
          ) : (
            <List>
              {feedback.map((item, index) => (
                <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="body1" gutterBottom>
                    {item.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(item.date).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Collapse>
      )}
    </Paper>
    </Container>
  </>
  );
}