// src/components/Contact.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('contact_us_title')}</h1>
      <p style={styles.intro}>{t('contact_us_intro')}</p>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>📧 {t('general_inquiries')}</h2>
        <ul style={styles.list}>
          <li>{t('email')}: <a href="mailto:support@ehealthconnect.com" style={styles.link}>support@ehealthconnect.com</a></li>
          <li>{t('phone')}: <a href="tel:+919876543210" style={styles.link}>+91 98765 43210</a></li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>🛠️ {t('technical_support')}</h2>
        <ul style={styles.list}>
          <li>{t('email')}: <a href="mailto:tech@ehealthconnect.com" style={styles.link}>tech@ehealthconnect.com</a></li>
          <li>{t('support_hours')}</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>🏢 {t('office_address')}</h2>
        <p style={styles.text}>
          {t('office_line1')}<br />
          {t('office_line2')}<br />
          {t('office_line3')}<br />
          {t('office_line4')}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem 1.5rem',
    maxWidth: '900px',
    margin: 'auto',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f9fbfc',
    color: '#212529',
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '1rem',
  },
  intro: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#555',
    marginBottom: '2.5rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '14px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    marginBottom: '2.5rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '1rem',
  },
  list: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    paddingLeft: '1rem',
    color: '#444',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  text: {
    fontSize: '1.05rem',
    color: '#444',
    lineHeight: '1.7',
  },
};

export default Contact;
