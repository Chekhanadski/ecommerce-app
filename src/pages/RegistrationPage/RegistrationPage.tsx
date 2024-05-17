import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './styles.module.css';

function RegistrationPage() {
  return (
    <main className={styles.mainBlock}>
      <div>
        <img src="/img/main-img.jpg" alt="Main" />
      </div>
      <div className={styles.formSignUpBlock}>
        <div>
          <h1 className={styles.h1}>Create an account</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
