import React from 'react';
import './styles.css';

function Footer(): React.ReactElement {
  return (
    <footer className="footer-block">
      <img className="rsschool-logo" src="/img/rsschool-logo.png" alt="RSSchool Logo" />
      <p className="footer-text">Final project within the JavaScript / Front-end Course RSSchool in 2024.</p>
    </footer>
  );
}

export default Footer;
