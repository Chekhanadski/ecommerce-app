import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { IoCartOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
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
                  <Link onClick={() => setIsOpen(false)} className={styles.navLink} to="/catalog">
                    Catalog
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
                <li>
                  <Link onClick={handleLogout} className={styles.navLink} to="/">
                    Log out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className={styles.headerIcons}>
          <Link onClick={handleLogout} className={styles.iconLink} to="/cart">
            <IoCartOutline size={25} />
          </Link>

          <Link onClick={handleLogout} className={styles.iconLink} to="/account">
            <FiUser size={25} />
          </Link>
        </div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.burger}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
