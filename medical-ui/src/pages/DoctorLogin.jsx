import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    specialization: '',
    licenseNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const base64url = (str) =>
    btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  const handleLogin = (e) => {
    e.preventDefault();

    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64url(JSON.stringify({ role: 'doctor', username: loginData.email }));
    const fakeToken = `${header}.${payload}.signature`;

    localStorage.setItem('token', fakeToken);
    navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Doctor Registered successfully!\nWelcome Dr. ${registerData.name}`);
    setIsRegistering(false);
    setRegisterData({
      name: '',
      age: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      specialization: '',
      licenseNumber: '',
      password: '',
    });
  };

  // PatientLogin styling with white form background
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    formWrapper: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '6px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    switchText: {
      marginTop: '20px',
      color: '#007bff',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'underline',
      fontSize: '14px',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
    },
  };

  const [btnHover, setBtnHover] = useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isRegistering ? 'Doctor Registration' : 'Doctor Login'}</h1>

      <div style={styles.formWrapper}>
        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              required
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Age"
              required
              value={registerData.age}
              onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
            />
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <input
              style={styles.input}
              type="tel"
              placeholder="Phone Number"
              required
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Address"
              required
              value={registerData.address}
              onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
            />
            <select
              style={styles.select}
              required
              value={registerData.gender}
              onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              style={styles.input}
              type="text"
              placeholder="Specialization"
              required
              value={registerData.specialization}
              onChange={(e) => setRegisterData({ ...registerData, specialization: e.target.value })}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="License Number"
              required
              value={registerData.licenseNumber}
              onChange={(e) => setRegisterData({ ...registerData, licenseNumber: e.target.value })}
            />

            <button
              type="submit"
              style={{ 
                ...styles.button, 
                ...(btnHover ? styles.buttonHover : {}) 
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              type="submit"
              style={{ 
                ...styles.button, 
                ...(btnHover ? styles.buttonHover : {}) 
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Login
            </button>
          </form>
        )}
      </div>

      <p style={styles.switchText} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Sign in here.' : 'New doctor? Register here.'}
      </p>
    </div>
  );
};

export default DoctorLogin;
