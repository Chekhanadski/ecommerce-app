import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../../store/appState';
import styles from './styles.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const snapshot = useSnapshot(state);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  const handleLogout = () => {
    state.logout();
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link onClick={() => setIsOpen(false)} className={styles.nameShopLink} to="/">
          <div className={styles.nameShop}>
            <img className={styles.exclusiveLogo} src="/img/logo-exclusive-black.png" alt="Exclusive Logo" />
            <span>Exclusive</span>
          </div>
        </Link>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.burger}>
          ☰
        </button>
        <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
          <button type="button" onClick={() => setIsOpen(false)} className={styles.closeButton}>
            ✖
          </button>
          <ul className={styles.headerNavList}>
            {!snapshot.isAuthorized ? (
              <>
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
              </>
            ) : (
              <>
                <li>
                  <Link onClick={() => setIsOpen(false)} className={styles.navLink} to="/">
                    Home
                  </Link>
                </li>
                <Link onClick={handleLogout} className={styles.navLink} to="/">
                  Log out
                </Link>
              </>
            )}
          </ul>
        </nav>
        <div className={styles.headerSearch} />
      </div>
    </header>
  );
}

export default Header;
