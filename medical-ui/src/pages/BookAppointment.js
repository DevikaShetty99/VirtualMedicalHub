import React, { useState } from 'react';

const doctors = [
  'Uday Vikram Singh',
  'Dr. Sharma',
  'Dr. Patel',
  'Dr. Mehta',
];

const problemTypes = [
  'General Checkup',
  'Fever',
  'Cold and Cough',
  'Skin Issues',
  'Other',
];

const Appointment = () => {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    doctorName: '',
    yourName: '',
    yourEmail: '',
    problemType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, validation, API calls etc.
    alert(`Appointment confirmed!\n
    Doctor: ${formData.doctorName}\n
    Date & Time: ${formData.appointmentDate}\n
    Name: ${formData.yourName}\n
    Email: ${formData.yourEmail}\n
    Problem: ${formData.problemType}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Book an Appointment</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Select Appointment Date & Time
          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Select Doctor Name
          <select
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="" disabled>
              -- Select Doctor --
            </option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Your Name
          <input
            type="text"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Your Mail
          <input
            type="email"
            name="yourEmail"
            value={formData.yourEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Problem Type
          <select
            name="problemType"
            value={formData.problemType}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="" disabled>
              -- Select Problem Type --
            </option>
            {problemTypes.map((problem) => (
              <option key={problem} value={problem}>
                {problem}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" style={styles.button}>
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f9fbfc',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#007bff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#212529',
  },
  input: {
    marginTop: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  select: {
    marginTop: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Appointment;
