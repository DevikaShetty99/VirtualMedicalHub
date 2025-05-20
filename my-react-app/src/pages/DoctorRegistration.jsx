// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Paper
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function DoctorRegistration() {
//   const navigate = useNavigate();
//   const [tab, setTab] = useState(0); // 0 = Login, 1 = Register

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     specialization: '',
//     email: '',
//     phone: '',
//     location: '',
//     password: ''
//   });

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleRegisterChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLoginChange = (e) => {
//     setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/api/doctors', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': '*/*'
//         }
//       });
//       const doctorId = response.data.id;
//       navigate(`/dashboard/doctor/${doctorId}`);
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:8080/api/doctors/login', loginData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       // 👇 If login is successful, you receive the doctor object
//       const doctor = response.data;
//       navigate(`/dashboard/doctor/${doctor.id}`);
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid email or password');
//     }
//   };
  

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Doctor Portal
//         </Typography>

//         <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
//           <Tab label="Sign In" />
//           <Tab label="Register" />
//         </Tabs>

//         {tab === 0 && (
//           <Box component="form" onSubmit={handleLoginSubmit} noValidate>
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               onChange={handleLoginChange}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               onChange={handleLoginChange}
//               margin="normal"
//             />
//             <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
//               Sign In
//             </Button>
//           </Box>
//         )}

//         {tab === 1 && (
//           <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 2 }}>
//             <TextField fullWidth label="First Name" name="firstName" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Last Name" name="lastName" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Specialization" name="specialization" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Email" name="email" type="email" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Phone" name="phone" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Location" name="location" onChange={handleRegisterChange} margin="normal" />
//             <TextField fullWidth label="Password" name="password" type="password" onChange={handleRegisterChange} margin="normal" />

//             <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
//               Register
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DoctorRegistration() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    experience: '',
    education: '',
    fees: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegisterChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/doctors', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      const doctorId = response.data.id;
      navigate(`/dashboard/doctor/${doctorId}`);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/doctors/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const doctor = response.data;
      navigate(`/dashboard/doctor/${doctor.id}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Doctor Portal
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>

        {tab === 0 && (
          <Box component="form" onSubmit={handleLoginSubmit} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleLoginChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={handleLoginChange}
              margin="normal"
            />
            <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Sign In
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 2 }}>
            <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleRegisterChange} margin="normal" required/>
            <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleRegisterChange} margin="normal" required/>
            <TextField fullWidth label="Specialization" name="specialization" value={formData.specialization} onChange={handleRegisterChange} margin="normal" required/>
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleRegisterChange} margin="normal" required/>
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleRegisterChange} margin="normal" />
            <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleRegisterChange} margin="normal" />
            <TextField fullWidth label="Experience (Years)" name="experience" value={formData.experience} onChange={handleRegisterChange} margin="normal" />
            <TextField fullWidth label="Education" name="education" value={formData.education} onChange={handleRegisterChange} margin="normal" />
            <TextField fullWidth label="Fees" name="fees" value={formData.fees} onChange={handleRegisterChange} margin="normal" required/>
            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleRegisterChange} margin="normal" required/>
            {/* <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Registersss
            </Button> */}
            <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
            disabled={
              !formData.firstName?.trim() ||
              !formData.lastName?.trim() ||
              !formData.specialization?.trim() ||
              !formData.email?.trim() ||
              !formData.fees?.toString().trim() ||
              !formData.password?.trim()
            }
          >
            Register
          </Button>

          </Box>
        )}
      </Paper>
    </Container>
  );
}
