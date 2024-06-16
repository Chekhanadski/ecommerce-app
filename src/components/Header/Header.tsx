import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import state from '../../store/appState';
import styles from './styles.module.css';
import { StoreContext } from '../../store/store';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setStore, store } = useContext(StoreContext);
  const { isAuthorized } = store;

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
    setStore((prevStore) => ({ ...prevStore, isAuthorized: false }));
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About Us" },
    { to: "/login", label: "Sign In", condition: !isAuthorized },
    { to: "/register", label: "Sign Up", condition: !isAuthorized },
    { to: "/", label: "Log out", condition: isAuthorized, onClick: handleLogout }
  ];

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
            {links.map((link) => {
              if (link.condition === undefined || link.condition) {
                return (
                  <li key={`${link.to}-${link.label}`}>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        if (link.onClick) link.onClick();
                      }}
                      className={styles.navLink}
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
        <div className={styles.headerIcons}>
          <Link onClick={() => setIsOpen(false)} className={styles.iconLink} to="/cart">
            <IoCartOutline size={25} />
          </Link>
          {isAuthorized && (
            <Link onClick={() => setIsOpen(false)} className={styles.iconLink} to="/account">
              <FiUser size={25} />
            </Link>
          )}
        </div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className={styles.burger}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
