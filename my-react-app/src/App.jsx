// src/App.jsx
import React, { useState } from 'react'
import {
  Button,
  Container,
  Typography,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')

  const handleFeedbackSubmit = () => {
    const feedbacks = JSON.parse(localStorage.getItem('appFeedbacks')) || []
    feedbacks.push({ message: feedbackText, date: new Date().toISOString() })
    localStorage.setItem('appFeedbacks', JSON.stringify(feedbacks))
    setFeedbackText('')
    setFeedbackOpen(false)
    alert('Thank you for your feedback!')
  }

  return (
    <>
      {/* Top-right Patient Help Manual */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          display: 'flex',
          gap: 1, // spacing between buttons
        }}
      >
        <Button variant="outlined" onClick={() => navigate('/patient-help')}>
          Patient Help Manual
        </Button>
        <Button variant="outlined" onClick={() => setFeedbackOpen(true)}>
          Give Feedback
        </Button>
      </Box>

      <Container maxWidth="sm" style={{ marginTop: '100px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Health Portal
        </Typography>
        <Typography variant="h6" gutterBottom>
          Register/Log In as:
        </Typography>
        <Stack spacing={2} direction="column" alignItems="center">
          <Button variant="contained" fullWidth onClick={() => navigate('/patient-registration')}>
            Patient
          </Button>
          <Button variant="contained" fullWidth onClick={() => navigate('/doctor-registration')}>
            Doctor
          </Button>
          </Stack>
          </Container>
          <Container maxWidth="sm" style={{ marginTop: '100px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            LogIn as:
          </Typography>
          <Button variant="contained" fullWidth onClick={() => navigate('/admin-registration')}>
            Admin
          </Button>
        
      </Container>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your feedback"
            fullWidth
            multiline
            rows={4}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit} disabled={!feedbackText.trim()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default App
