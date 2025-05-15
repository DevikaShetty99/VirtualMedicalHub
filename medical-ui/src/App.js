import React, { useEffect, useState } from 'react';
import { getDoctors } from './services/doctorServices.js'; // Importing the service function

function App() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors when the component mounts
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="App">
      <h1>Doctors List</h1>
      <ul>
        {doctors.length === 0 ? (
          <p>No doctors available</p>
        ) : (
          doctors.map((doctor) => (
            <li key={doctor.id}>
              {doctor.firstName} {doctor.lastName} - {doctor.specialization}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;