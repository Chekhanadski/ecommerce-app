import React from 'react';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footerBlock}>
      <img className={styles.rsschoolLogo} src="/img/rsschool-logo.png" alt="RSSchool Logo" />
      <p className={styles.footerText}>Final project within the JavaScript / Front-end Course RSSchool in 2024.</p>
    </footer>
  );
}

export default Footer;
