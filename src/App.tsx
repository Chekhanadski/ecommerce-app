import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';

function App(): React.ReactElement {
  return (
    <div>
      <div className="sale-offer"> </div>
      <div className="wrapper">
        <Header />
        <MainSectionRouter />
        <Footer />
      </div>
    </div>
  );
}

export default App;
