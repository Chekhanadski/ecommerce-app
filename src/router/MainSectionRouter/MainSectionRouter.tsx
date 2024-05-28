import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import {
  LoginPage,
  MainPage,
  AccountPage,
  AddressPage,
  CatalogPage,
  RegistrationPage,
  NotFoundPage
} from '../../pages/index';

const routes = [
  { path: '/', element: <MainPage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegistrationPage /> },
  { path: '/account', element: <AccountPage /> },
  { path: '/account/address', element: <AddressPage /> },
  { path: '*', element: <NotFoundPage /> }
];

function MainSectionRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainSectionRouter;
