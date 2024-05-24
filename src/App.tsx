import React from 'react';
import './App.css';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';

function App(): React.ReactElement {
  return (
    <div>
      <div className="sale-offer"> </div>
      <div className="wrapper">
        <MainSectionRouter />
      </div>
    </div>
  );
}

export default App;
