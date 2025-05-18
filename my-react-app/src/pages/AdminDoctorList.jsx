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

export default function AdminDoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/doctors');
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      alert('Failed to fetch doctors',error);
    }
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      alert('Failed to fetch doctor details',error);
    }
  };

  const toggleDoctor = async (doctorId) => {
    if (expandedDoctorId === doctorId) {
      setExpandedDoctorId(null); // collapse
    } else {
      const detailed = await fetchDoctorDetails(doctorId);
      setDoctors((prev) =>
        prev.map((doc) => (doc.id === doctorId ? { ...doc, ...detailed } : doc))
      );
      setExpandedDoctorId(doctorId);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Management
      </Typography>

      <Button variant="contained" onClick={fetchDoctors}>
        View All Doctors
      </Button>

      <List>
        {doctors.map((doc) => (
          <React.Fragment key={doc.id}>
            <ListItem button onClick={() => toggleDoctor(doc.id)}>
              <ListItemText
                primary={`${doc.firstName} ${doc.lastName}`}
                secondary={doc.email}
              />
              {expandedDoctorId === doc.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={expandedDoctorId === doc.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4, pb: 2 }}>
                <ListItemText
                  primary="Specialization"
                  secondary={doc.specialization}
                />
                <ListItemText primary="Phone" secondary={doc.phone} />
                <ListItemText primary="Gender" secondary={doc.gender} />
                <ListItemText primary="Address" secondary={doc.address} />
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}
