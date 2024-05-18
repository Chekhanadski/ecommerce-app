import React from 'react';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footerBlock}>
      <img className={styles.rsschoolLogo} src="/img/rsschool-logo.png" alt="RSSchool Logo" />
      <div>
        <p className={styles.footerText}>eCommerce project 2024.</p>
      </div>
      <img className={styles.exclusiveLogo} src="/img/logo-exclusive-white.png" alt="Exclusive Logo" />
    </footer>
  );
}

export default Footer;
