import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockPatientName = 'John Doe';
const mockAppointments = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-05-20', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Lee', date: '2025-05-25', status: 'Pending' },
];
const mockHealthRecords = {
  prescriptions: 5,
  labReports: 3,
  expenses: '$450',
};

const doctors = ['Uday Vikram Singh', 'Dr. Sharma', 'Dr. Patel'];
const problemTypes = ['General Checkup', 'Fever', 'Cold & Cough', 'Skin Issues', 'Other'];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [formData, setFormData] = useState({
    appointmentDate: '',
    doctorName: '',
    yourName: '',
    yourEmail: '',
    problemType: '',
  });

  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    department: '',
    contactEmail: '',
    urgency: 'Normal',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Appointment confirmed!\nDoctor: ${formData.doctorName}\nDate & Time: ${formData.appointmentDate}\nName: ${formData.yourName}\nEmail: ${formData.yourEmail}\nProblem: ${formData.problemType}`);
    setFormData({
      appointmentDate: '',
      doctorName: '',
      yourName: '',
      yourEmail: '',
      problemType: '',
    });
  };

  const handleComplaintChange = (e) => {
    const { name, value } = e.target;
    setComplaintForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    alert(`📣 Complaint submitted!\nTitle: ${complaintForm.title}\nDepartment: ${complaintForm.department}\nUrgency: ${complaintForm.urgency}\nEmail: ${complaintForm.contactEmail}\nDescription: ${complaintForm.description}`);
    setComplaintForm({
      title: '',
      description: '',
      department: '',
      contactEmail: '',
      urgency: 'Normal',
    });
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>MediCare</h2>
        <button onClick={() => navigate('/')} style={styles.homeButton}>🏡 Home</button>
        <nav style={styles.nav}>
          <a onClick={() => setActiveSection('dashboard')} style={styles.navLink}>🏠 Dashboard</a>
          <a onClick={() => setActiveSection('appointments')} style={styles.navLink}>📅 Appointments</a>
          <a href="#" style={styles.navLink}>📋 Health Records</a>
          <a onClick={() => setActiveSection('complaints')} style={styles.navLink}>📝 Complaints</a>
        </nav>
      </aside>

      <main style={styles.main}>
        {activeSection === 'dashboard' && (
          <>
            <header style={styles.header}>
              <h1>Welcome back, <span style={styles.patientName}>{mockPatientName}</span> 👋</h1>
              <p style={styles.subheading}>Here's your health overview</p>
            </header>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Upcoming Appointments</h2>
              <div style={styles.card}>
                {mockAppointments.length === 0 ? (
                  <p>No upcoming appointments.</p>
                ) : (
                  mockAppointments.map(app => (
                    <div key={app.id} style={styles.appointment}>
                      <div>
                        <strong>{app.doctor}</strong> <br />
                        <small>{new Date(app.date).toLocaleDateString()}</small>
                      </div>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: app.status === 'Confirmed' ? '#28a745' : '#ffc107',
                        color: app.status === 'Confirmed' ? 'white' : '#212529',
                      }}>
                        {app.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Health Records Summary</h2>
              <div style={styles.recordsGrid}>
                <div style={styles.recordCard}><div style={styles.recordIcon}>💊</div><p style={styles.recordTitle}>Prescriptions</p><p style={styles.recordValue}>{mockHealthRecords.prescriptions}</p></div>
                <div style={styles.recordCard}><div style={styles.recordIcon}>🔬</div><p style={styles.recordTitle}>Lab Reports</p><p style={styles.recordValue}>{mockHealthRecords.labReports}</p></div>
                <div style={styles.recordCard}><div style={styles.recordIcon}>💰</div><p style={styles.recordTitle}>Expenses</p><p style={styles.recordValue}>{mockHealthRecords.expenses}</p></div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'appointments' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Book New Appointment</h2>
            <form onSubmit={handleSubmit} style={{ ...styles.card, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                Appointment Date & Time:
                <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={styles.input} />
              </label>
              <label>
                Select Doctor:
                <select name="doctorName" value={formData.doctorName} onChange={handleChange} required style={styles.input}>
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                </select>
              </label>
              <label>
                Your Name:
                <input type="text" name="yourName" value={formData.yourName} onChange={handleChange} required style={styles.input} />
              </label>
              <label>
                Your Email:
                <input type="email" name="yourEmail" value={formData.yourEmail} onChange={handleChange} required style={styles.input} />
              </label>
              <label>
                Problem Type:
                <select name="problemType" value={formData.problemType} onChange={handleChange} required style={styles.input}>
                  <option value="">-- Select Issue --</option>
                  {problemTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <button type="submit" style={styles.button}>Confirm Appointment</button>
            </form>
          </section>
        )}

        {activeSection === 'complaints' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Submit a Complaint</h2>
            <form onSubmit={handleComplaintSubmit} style={{ ...styles.card, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                Complaint Title:
                <input
                  type="text"
                  name="title"
                  value={complaintForm.title}
                  onChange={handleComplaintChange}
                  required
                  style={styles.input}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={complaintForm.description}
                  onChange={handleComplaintChange}
                  required
                  rows="4"
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </label>
              <label>
                Department Concerned:
                <select
                  name="department"
                  value={complaintForm.department}
                  onChange={handleComplaintChange}
                  required
                  style={styles.input}
                >
                  <option value="">-- Select Department --</option>
                  <option value="Reception">Reception</option>
                  <option value="Billing">Billing</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </label>
              <label>
                Contact Email:
                <input
                  type="email"
                  name="contactEmail"
                  value={complaintForm.contactEmail}
                  onChange={handleComplaintChange}
                  required
                  style={styles.input}
                />
              </label>
              <label>
                Urgency Level:
                <select
                  name="urgency"
                  value={complaintForm.urgency}
                  onChange={handleComplaintChange}
                  style={styles.input}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </label>
              <button type="submit" style={styles.button}>Submit Complaint</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '40px',
  },
  homeButton: {
    backgroundColor: 'white',
    color: '#007bff',
    fontWeight: '700',
    fontSize: '18px',
    padding: '12px 20px',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  main: {
    flexGrow: 1,
    padding: '40px 60px',
    overflowY: 'auto',
  },
  header: {
    marginBottom: '40px',
  },
  patientName: {
    color: '#007bff',
  },
  subheading: {
    color: '#6c757d',
    fontSize: '16px',
    marginTop: '6px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#343a40',
    borderBottom: '2px solid #007bff',
    paddingBottom: '6px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  appointment: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 15px',
    borderBottom: '1px solid #e9ecef',
    fontSize: '16px',
    alignItems: 'center',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '14px',
    minWidth: '90px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '30px',
    color: 'white',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  recordsGrid: {
    display: 'flex',
    gap: '25px',
  },
  recordCard: {
    flex: 1,
    backgroundColor: '#007bff',
    color: 'white',
    padding: '25px 20px',
    borderRadius: '15px',
    textAlign: 'center',
  },
  recordIcon: {
    fontSize: '36px',
    marginBottom: '15px',
  },
  recordTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  recordValue: {
    fontSize: '28px',
    fontWeight: '700',
    marginTop: '10px',
  },
  input: {
    marginTop: '6px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
  },
};

export default PatientDashboard;
