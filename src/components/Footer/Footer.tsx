import React from 'react';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footerBlock}>
      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <img className={styles.rsschoolLogo} src="/img/rsschool-logo.png" alt="RSSchool Logo" />
      </a>

      <div>
        <p className={styles.footerText}>eCommerce project 2024.</p>
      </div>
      <img className={styles.exclusiveLogo} src="/img/logo-exclusive-white.png" alt="RSSchool Logo" />
    </footer>
  );
}

export default Footer;
