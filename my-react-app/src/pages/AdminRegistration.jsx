import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';

export default function AdminRegistration() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Portal
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>

        {tab === 0 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth label="Email" margin="normal" />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign In
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth label="Full Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Phone Number" margin="normal" />
            <TextField
              fullWidth
              label="Create Password"
              type="password"
              margin="normal"
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
