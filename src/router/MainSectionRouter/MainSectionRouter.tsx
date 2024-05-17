import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";


function Main() {
  return <h1>Main Page Text Placeholder</h1>
}
function Login() {
  return <h1>Login Page Text Placeholder</h1>
}
function NotFoundPage() {
  return <h1>404 Not Found Text Placeholder</h1>
}

function MainSectionRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default MainSectionRouter;