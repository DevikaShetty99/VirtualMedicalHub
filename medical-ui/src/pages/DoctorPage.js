import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDoctors } from '../services/doctorServices'; // Adjust path if necessary

function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    email: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors(); // Using the service function
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/doctors', formData);
      setFormData({
        firstName: '',
        lastName: '',
        specialization: '',
        email: '',
        phone: '',
        location: '',
      });
      fetchDoctors(); // Refresh list
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctors</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <button type="submit">Add Doctor</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.firstName} {doc.lastName}</td>
              <td>{doc.specialization}</td>
              <td>{doc.email}</td>
              <td>{doc.phone}</td>
              <td>{doc.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorPage;
