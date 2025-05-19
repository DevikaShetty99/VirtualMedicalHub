// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Tabs,
//   Tab,
//   Paper,
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function PatientRegistration() {
//   const [tab, setTab] = useState(0);
//   const navigate = useNavigate();
//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };


//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     email: '',
//     phone: '',
//     address: '',
//     gender: '',
//     healthHistory: '',
//     emergencyContact: '',
//     password:'',
//   });
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const now = new Date().toISOString();

//     try {
//       const response = await axios.post('http://localhost:8080/api/patients', {
//         ...formData,
//         age: parseInt(formData.age),
//         createdDate: now,
//         updatedDate: now,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': '*/*'
//         }
//       });

//       console.log('Patient created:', response.data);
//       navigate(`/dashboard/patient/${response.data.id}`);
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Patient Portal
//         </Typography>

//         <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
//           <Tab label="Sign In" />
//           <Tab label="Register" />
//         </Tabs>

//         {tab === 1 && (
//           <Box component="form" onSubmit={handleRegister} noValidate>
//             <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Health History" name="healthHistory" value={formData.healthHistory} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} margin="normal" />
//             <TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleInputChange} margin="normal" />

//             <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
//               Register
//             </Button>
//           </Box>
//         )}

//         {tab === 0 && (
//          <Box component="form" noValidate autoComplete="off">
//          <TextField fullWidth label="Email" margin="normal" />
//          <TextField
//            fullWidth
//            label="Password"
//            type="password"
//            margin="normal"
//          />
//          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
//            Sign In
//          </Button>
//        </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// }
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PatientRegistration() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    healthHistory: '',
    emergencyContact: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/patients',
        {
          ...formData,
          age: parseInt(formData.age),
          createdDate: now,
          updatedDate: now,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        }
      );

      console.log('Patient created:', response.data);
      navigate(`/dashboard/patient/${response.data.id}`);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/patients/login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        }
      );

      console.log('Login success:', response.data);
      navigate(`/dashboard/patient/${response.data.id}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Patient Portal
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>

        {tab === 1 && (
          <Box component="form" onSubmit={handleRegister} noValidate>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Health History" name="healthHistory" value={formData.healthHistory} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} margin="normal" />

            <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        )}

        {tab === 0 && (
          <Box component="form" onSubmit={handleLogin} noValidate autoComplete="off">
            <TextField fullWidth label="Email" name="email" value={loginData.email} onChange={handleLoginInputChange} margin="normal" />
            <TextField fullWidth label="Password" name="password" type="password" value={loginData.password} onChange={handleLoginInputChange} margin="normal" />
            <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Sign In
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
