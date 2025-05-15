import React from 'react';
import { useTranslation } from 'react-i18next';

const HelpManual = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('help_manual')}</h1>
      <p style={styles.intro}>{t('help_manual_content')}</p>

      {/* Patient Guide */}
      <Section
        title={t('patient_guide')}
        items={t('patient_steps', { returnObjects: true })}
      />

      {/* Doctor Guide */}
      <Section
        title={t('doctor_guide')}
        items={t('doctor_steps', { returnObjects: true })}
      />

      {/* Admin Guide */}
      <Section
        title={t('admin_guide')}
        items={t('admin_steps', { returnObjects: true })}
      />

      {/* Support */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>{t('support_contact')}</h2>
        <p style={styles.paragraph}>{t('support_text')}</p>
        <ul style={styles.list}>
          <li>
            Email: <a href="mailto:support@ehealthconnect.com" style={styles.link}>support@ehealthconnect.com</a>
          </li>
          <li>
            Phone: <a href="tel:+919876543210" style={styles.link}>+91 98765 43210</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Reusable Section component remains the same
const Section = ({ title, items }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <ul style={styles.list}>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>{item}</li>
      ))}
    </ul>
  </div>
);

const styles = {
  container: {
    padding: '3rem 1.5rem',
    maxWidth: '960px',
    margin: 'auto',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#212529',
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '1.2rem',
  },
  intro: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '2.5rem',
    color: '#555',
  },
  section: {
    marginBottom: '2.8rem',
    backgroundColor: '#ffffff',
    padding: '1.8rem',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '1.7rem',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '1rem',
  },
  list: {
    paddingLeft: '1.5rem',
    fontSize: '1.05rem',
    color: '#444',
  },
  listItem: {
    marginBottom: '0.7rem',
    lineHeight: '1.6',
  },
  paragraph: {
    fontSize: '1.05rem',
    color: '#444',
    marginBottom: '1rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default HelpManual;
