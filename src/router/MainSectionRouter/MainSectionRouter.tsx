import React, { useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ROUTES from '../../pages/routes';
import { StoreContext } from '../../App';

function MainSectionRouter() {
  const { store } = useContext(StoreContext);
  const { isAuthorized } = store;

  return (
    <Router>
      <Header />
      <Routes>
        {ROUTES.map((route) => {
          if (route.path === '/account') {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={isAuthorized ? <route.element /> : <Navigate to="/login" />}
              />
            );
          }
          return <Route key={route.path} path={route.path} element={<route.element />} />;
        })}
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainSectionRouter;
