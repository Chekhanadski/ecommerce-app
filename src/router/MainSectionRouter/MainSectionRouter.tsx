import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ROUTES from '../../pages/routes';

function MainSectionRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element/>} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainSectionRouter;
