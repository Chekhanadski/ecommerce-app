import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import CatalogPage from '../../pages/CatalogPage/CatalogPage';

function MainSectionRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainSectionRouter;
