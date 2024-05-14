import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

function App(): React.ReactElement {
  return (
    <div>
      <div className="sale-offer"> </div>
      <div className="wrapper">
        <Header />
        <RegistrationPage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
