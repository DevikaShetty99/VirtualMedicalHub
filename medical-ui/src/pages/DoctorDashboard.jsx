import React from 'react';
import { useNavigate } from 'react-router-dom';


const mockDoctorName = 'Dr. Emily Clark';
const mockAppointments = [
  { id: 1, patient: 'John Doe', date: '2025-05-20', status: 'Confirmed' },
  { id: 2, patient: 'Alice Johnson', date: '2025-05-25', status: 'Pending' },
];
const mockComplaints = [
  { id: 1, fromPatient: 'John Doe', complaint: 'Incorrect dosage in prescription' },
];
const mockDayStats = {
  appointmentsToday: 5,
  commissionEarned: '$1200',
  dayStatus: 'Open',
};

const DoctorDashboard = () => {
    const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>MediCare</h2>
            <button 
        onClick={() => navigate('/')} 
        style={styles.homeButton}>
        🏡 Home
    </button>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>🏠 Dashboard</a>
          <a href="#" style={styles.navLink}>📅 Appointments</a>
          <a href="#" style={styles.navLink}>📋 Patient History</a>
          <a href="#" style={styles.navLink}>📝 E-Prescriptions</a>
          <a href="#" style={styles.navLink}>⚙️ Profile</a>
          <a href="#" style={styles.navLink}>🔔 Complaints</a>
          <a href="#" style={{ ...styles.navLink, color: '#dc3545' }}>Logout</a>
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1>Welcome, <span style={styles.doctorName}>{mockDoctorName}</span> 👨‍⚕️</h1>
          <p style={styles.subheading}>Your daily overview & management</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Today's Stats</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <p style={styles.statTitle}>Appointments Today</p>
              <p style={styles.statValue}>{mockDayStats.appointmentsToday}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💰</div>
              <p style={styles.statTitle}>Commission Earned</p>
              <p style={styles.statValue}>{mockDayStats.commissionEarned}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏳</div>
              <p style={styles.statTitle}>Day Status</p>
              <p style={{...styles.statValue, color: mockDayStats.dayStatus === 'Open' ? '#28a745' : '#dc3545'}}>
                {mockDayStats.dayStatus}
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Upcoming Appointments</h2>
          <div style={styles.card}>
            {mockAppointments.length === 0 ? (
              <p>No upcoming appointments.</p>
            ) : (
              mockAppointments.map(app => (
                <div key={app.id} style={styles.appointment}>
                  <div>
                    <strong>{app.patient}</strong><br />
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
            <button style={styles.button} onClick={() => alert('Manage appointments')}>
              Manage Appointments
            </button>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Patient Complaints</h2>
          <div style={styles.card}>
            {mockComplaints.length === 0 ? (
              <p>No complaints assigned.</p>
            ) : (
              mockComplaints.map(c => (
                <div key={c.id} style={styles.complaint}>
                  <strong>{c.fromPatient}</strong>: {c.complaint}
                </div>
              ))
            )}
            <button style={styles.button} onClick={() => alert('View & respond to complaints')}>
              View Complaints
            </button>
          </div>
        </section>
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
      transition: 'color 0.3s',
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
      cursor: 'default',
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
      marginTop: '15px',
      backgroundColor: '#007bff',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '30px',
      color: 'white',
      fontWeight: '700',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0,123,255,0.3)',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
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
      boxShadow: '0 5px 15px rgba(0,123,255,0.4)',
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
    sidebar: {
        width: '220px',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
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
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      homeButtonHover: {
        backgroundColor: '#0056b3',
        color: 'white',
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
        transition: 'color 0.3s',
      },
  };
  
  export default DoctorDashboard;
  