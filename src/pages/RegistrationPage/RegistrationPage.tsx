import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './styles.css';

function RegistrationPage() {
  return (
    <div className="wrapper">
      <Header />

      <main className="main-block">
        <div>
          <img src="/img/main-img.jpg" alt="Main" />
        </div>
        <div className="form-sign-up-block">
          <div>
            <h1 className="h1">Create an account</h1>
            <SignUpForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegistrationPage;
