import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './styles.module.css';

function RegistrationPage() {
  return (
    <main className={styles.mainBlock}>
      <div>
        <img className={styles.mainImg} src="/img/main-img.jpg" alt="Main" />
      </div>
      <div className={styles.formLoginBlock}>
        <div>
          <h1 className={styles.h1}>Log in to Exclusive</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
