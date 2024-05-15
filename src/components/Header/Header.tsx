import React from 'react';
import styles from './styles.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.nameShop}>
          <span>Exclusive</span>
        </div>
        <nav className={styles.headerNav}>
          <ul className={styles.headerNavList}>
            <li>
              <a className={styles.navLink} href="/#">
                Home
              </a>
            </li>
            <li>
              <a className={styles.navLink} href="/#">
                Sign In
              </a>
            </li>
            <li>
              <a className={styles.navLink} href="/#">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.headerSearch} />
      </div>
    </header>
  );
}

export default Header;
