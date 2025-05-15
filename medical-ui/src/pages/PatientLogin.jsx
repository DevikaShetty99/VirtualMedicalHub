import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
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

  const navigate = useNavigate();

  const base64url = (str) =>
    btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  const handleLogin = (e) => {
    e.preventDefault();
    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64url(JSON.stringify({ role: 'patient', username: loginData.email }));
    const token = `${header}.${payload}.signature`;
    localStorage.setItem('token', token);
    navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`✅ Registered successfully!\nWelcome, ${registerData.name}`);
    setIsRegistering(false); // return to login screen after registering
    setRegisterData({
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
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#007bff',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
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
      marginTop: '10px',
    },
    switchText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#555',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isRegistering ? 'Patient Registration' : 'Patient Login'}</h1>

      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <input style={styles.input} type="text" name="name" placeholder="Full Name" required value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
          <input style={styles.input} type="number" name="age" placeholder="Age" required value={registerData.age} onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })} />
          <input style={styles.input} type="email" name="email" placeholder="Email" required value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
          <input style={styles.input} type="password" name="password" placeholder="Password" required value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
          <input style={styles.input} type="tel" name="phone" placeholder="Phone Number" required value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} />
          <input style={styles.input} type="text" name="address" placeholder="Address" required value={registerData.address} onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })} />
          <select style={styles.input} name="gender" value={registerData.gender} onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea style={styles.input} name="healthHistory" placeholder="Health History" rows="3" value={registerData.healthHistory} onChange={(e) => setRegisterData({ ...registerData, healthHistory: e.target.value })}></textarea>
          <input style={styles.input} type="text" name="emergencyContact" placeholder="Emergency Contact" required value={registerData.emergencyContact} onChange={(e) => setRegisterData({ ...registerData, emergencyContact: e.target.value })} />
          <button type="submit" style={styles.button}>Register</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" required value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <input style={styles.input} type="password" placeholder="Password" required value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <button style={styles.button} type="submit">Login</button>
        </form>
      )}

      <p style={styles.switchText} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Sign in here.' : 'New user? Register here.'}
      </p>
    </div>
  );
};

export default PatientAuth;
