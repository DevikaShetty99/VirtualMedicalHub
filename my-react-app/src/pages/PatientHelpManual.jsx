import React from 'react'
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'

const PatientHelpManual = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Patient Help Manual
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Registering as a Patient
      </Typography>
      <Typography paragraph>
        Click the "Patient" button on the homepage. Fill out the registration form with your personal details including name, email, date of birth, and password. Click submit to create your account.
      </Typography>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        2. Logging In
      </Typography>
      <Typography paragraph>
        Once registered, you can log in using your email and password from the login page.
      </Typography>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        3. Booking an Appointment
      </Typography>
      <Typography paragraph>
        Navigate to the "Book Appointment" section after logging in. Select the doctor, choose a date and time, and click "Confirm Appointment".
      </Typography>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        4. Viewing Medical Records
      </Typography>
      <Typography paragraph>
        Go to "My Records" to view your prescriptions, past diagnoses, and other medical history shared by your doctor.
      </Typography>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        6. Getting Support
      </Typography>
      <Typography paragraph>
        For technical support or general inquiries email us at support@virtualmedicalhome.com.
      </Typography>
    </Container>
  )
}

export default PatientHelpManual
