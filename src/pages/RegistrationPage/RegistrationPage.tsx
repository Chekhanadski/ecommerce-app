import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
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
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
