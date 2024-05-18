import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

function Main() {
  return <h1>Main Page Text Placeholder</h1>;
}
function Login() {
  return <h1>Login Page Text Placeholder</h1>;
}

function MainSectionRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainSectionRouter;
