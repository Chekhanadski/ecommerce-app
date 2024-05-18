import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.nameShop}>
          <span>Exclusive</span>
        </div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.burger}>
          ☰
        </button>
        <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
          <button type="button" onClick={() => setIsOpen(false)} className={styles.closeButton}>
            ✖
          </button>
          <ul className={styles.headerNavList}>
            <li>
              <Link onClick={() => setIsOpen(false)} className={styles.navLink} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} className={styles.navLink} to="/login">
                Sign In
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} className={styles.navLink} to="/register">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.headerSearch} />
      </div>
    </header>
  );
}

export default Header;
