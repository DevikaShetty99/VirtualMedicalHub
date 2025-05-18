import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function AdminPatientList() {
  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/patients');
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      alert('Failed to fetch patients', error);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/patients/${patientId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      alert('Failed to fetch patient details', error);
    }
  };

  const togglePatient = async (patientId) => {
    if (expandedPatientId === patientId) {
      setExpandedPatientId(null); // collapse
    } else {
      const detailed = await fetchPatientDetails(patientId);
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === patientId ? { ...patient, ...detailed } : patient
        )
      );
      setExpandedPatientId(patientId);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>

      <Button variant="contained" onClick={fetchPatients}>
        View All Patients
      </Button>

      <List>
        {patients.map((patient) => (
          <React.Fragment key={patient.id}>
            <ListItem button onClick={() => togglePatient(patient.id)}>
              <ListItemText
                primary={`${patient.firstName} ${patient.lastName}`}
                secondary={patient.email || patient.phone || 'No contact info'}
              />
              {expandedPatientId === patient.id ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse in={expandedPatientId === patient.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4, pb: 2 }}>
                {/* Add patient-specific details below, adjust keys as per your API */}
                <ListItemText primary="Phone" secondary={patient.phone} />
                <ListItemText primary="Gender" secondary={patient.gender} />
                <ListItemText primary="Address" secondary={patient.address} />
                <ListItemText primary="Date of Birth" secondary={patient.dob} />
                {/* Add more fields if you have */}
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}
