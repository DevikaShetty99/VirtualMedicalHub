import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockAdminName = 'Admin Jane Doe';

const mockUsersSummary = {
  patients: 250,
  doctors: 40,
  admins: 3,
};

const mockReports = [
  { id: 1, title: 'Monthly Patient Activity', date: '2025-05-01' },
  { id: 2, title: 'Doctor Performance Report', date: '2025-05-05' },
  { id: 3, title: 'System Usage Summary', date: '2025-05-10' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
  <h2 style={styles.logo}>MediCare Admin</h2>

  <button 
    onClick={() => navigate('/')} 
    style={styles.homeButton}>
    🏡 Home
  </button>

  <nav style={styles.nav}>
    <a href="#" style={styles.navLink}>🏠 Dashboard</a>
    <a href="#" style={styles.navLink}>👥 User Management</a>
    <a href="#" style={styles.navLink}>📊 Reports</a>
    <a href="#" style={styles.navLink}>⚙️ Profile</a>
    <a href="#" style={{ ...styles.navLink, color: '#dc3545' }}>Logout</a>
  </nav>
</aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1>Welcome, <span style={styles.adminName}>{mockAdminName}</span> 👩‍💼</h1>
          <p style={styles.subheading}>Admin controls and reports overview</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Users Summary</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🧑‍🤝‍🧑</div>
              <p style={styles.statTitle}>Patients</p>
              <p style={styles.statValue}>{mockUsersSummary.patients}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👩‍⚕️</div>
              <p style={styles.statTitle}>Doctors</p>
              <p style={styles.statValue}>{mockUsersSummary.doctors}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🛡️</div>
              <p style={styles.statTitle}>Admins</p>
              <p style={styles.statValue}>{mockUsersSummary.admins}</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Reports</h2>
          <div style={styles.card}>
            {mockReports.length === 0 ? (
              <p>No reports generated yet.</p>
            ) : (
              mockReports.map(report => (
                <div key={report.id} style={styles.reportItem}>
                  <strong>{report.title}</strong>
                  <span style={styles.reportDate}>{new Date(report.date).toLocaleDateString()}</span>
                </div>
              ))
            )}
            <button style={styles.button} onClick={() => alert('Generate new report')}>
              Generate Report
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
      }
  };
  
  export default AdminDashboard;
//