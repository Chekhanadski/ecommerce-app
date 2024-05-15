import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [isOpen])

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
              <a onClick={() => setIsOpen(false)} className={styles.navLink} href="/#">
                Home
              </a>
            </li>
            <li>
              <a onClick={() => setIsOpen(false)} className={styles.navLink} href="/#">

                Sign In
              </a>
            </li>
            <li>

              <a onClick={() => setIsOpen(false)} className={styles.navLink} href="/#">
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
