// src/App.jsx
import React from 'react'
import { Button, Container, Typography, Stack } from '@mui/material'
import PatientRegistration from './pages/PatientRegistration';
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Health Portal
      </Typography>
      <Typography variant="h6" gutterBottom>
        Register as:
      </Typography>
      <Stack spacing={2} direction="column" alignItems="center">
        <Button variant="contained" fullWidth onClick={() => navigate('/patient-registration')}>
          Patient
        </Button>
        <Button variant="contained" fullWidth onClick={() => navigate('/doctor-registration')}>
          Doctor
        </Button>
        <Button variant="contained" fullWidth onClick={() => navigate('/admin-registration')}>
          Admin
        </Button>
      </Stack>
    </Container>
    
  )
  
}

export default App
