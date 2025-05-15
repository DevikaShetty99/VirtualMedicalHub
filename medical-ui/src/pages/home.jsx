import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const navButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '0 12px',
    fontSize: '1rem',
    fontWeight: '600',
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#007bff',
        color: 'white',
        gap: '1.5rem',
        fontWeight: '600',
        fontSize: '1rem',
      }}
    >
      <button onClick={() => navigate('/help')} style={navButtonStyle}>
        {t('help_manual')}
      </button>
      <button onClick={() => navigate('/contact')} style={navButtonStyle}>
        {t('contact')}
      </button>

      <select
        aria-label="Select Language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        style={{
          padding: '6px 10px',
          borderRadius: '5px',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          backgroundColor: 'white',
          color: '#007bff',
          minWidth: '110px',
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="kn">ಕನ್ನಡ</option>
      </select>
    </nav>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: '1900px',
        margin: 'auto',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <header
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          padding: '2rem 2rem 4rem 2rem',
          boxShadow: '0 6px 15px rgba(0,123,255,0.4)',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
          {t('welcome')}
        </h1>
        <p
          style={{
            fontSize: '1.3rem',
            maxWidth: '700px',
            margin: 'auto',
            lineHeight: '1.6',
          }}
        >
          {t('subtitle')}
        </p>
      </header>

      {/* Login Buttons */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '28px',
          marginTop: '-3rem',
          marginBottom: '5rem',
          flexWrap: 'wrap',
        }}
      >
        <button style={buttonStyle('#17a2b8')} onClick={() => navigate('/login/patient')}>
          {t('patient_login')}
        </button>
        <button style={buttonStyle('#28a745')} onClick={() => navigate('/login/doctor')}>
          {t('doctor_login')}
        </button>
        <button
          style={buttonStyle('#ffc107', '#212529')}
          onClick={() => navigate('/login/admin')}
        >
          {t('admin_login')}
        </button>
      </section>

      {/* Features */}
      <section
        style={{
          backgroundColor: '#f7f9fc',
          padding: '1rem 1rem 5rem 1rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2.3rem',
            fontWeight: '700',
            marginBottom: '3rem',
            color: '#007bff',
          }}
        >
          {t('platform_features')}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '2rem',
            flexWrap: 'nowrap',
            overflowX: 'auto',
          }}
        >
          <FeatureCard icon="👤" title={t('patient_services')} description={t('patient_services_desc')} />
          <FeatureCard icon="🩺" title={t('doctor_tools')} description={t('doctor_tools_desc')} />
          <FeatureCard icon="🛠️" title={t('admin_control')} description={t('admin_control_desc')} />
        </div>
      </section>

      {/* About */}
      <section
        style={{
          maxWidth: '720px',
          margin: 'auto',
          padding: '3rem 1rem 5rem 1rem',
          textAlign: 'center',
          color: '#333',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#007bff',
          }}
        >
          {t('why_system')}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>{t('why_system_desc')}</p>
      </section>
    </div>
  );
};

const buttonStyle = (bgColor, textColor = 'white') => ({
  cursor: 'pointer',
  border: 'none',
  padding: '16px 36px',
  fontSize: '1.2rem',
  fontWeight: '700',
  borderRadius: '45px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  willChange: 'transform, box-shadow',
  backgroundColor: bgColor,
  color: textColor,
});

const FeatureCard = ({ icon, title, description }) => (
  <div
    style={{
      backgroundColor: 'white',
      padding: '2rem 1.5rem',
      borderRadius: '16px',
      width: '300px',
      flex: '1 1 300px',
      maxWidth: '300px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      marginBottom: '1rem',
    }}
  >
    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{icon}</div>
    <h3
      style={{
        fontSize: '1.7rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: '#007bff',
      }}
    >
      {title}
    </h3>
    <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.6' }}>{description}</p>
  </div>
);

export default Home;
