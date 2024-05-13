import React from 'react';
import './styles.css';

function Header(): React.ReactElement {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="name-shop">
          <span>Exclusive</span>
        </div>
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li>
              <a className="nav-link" href="/#">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link" href="/#">
                Sign In
              </a>
            </li>
            <li>
              <a className="nav-link" href="/#">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-search" />
      </div>
    </header>
  );
}

export default Header;
