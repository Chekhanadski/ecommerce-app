import React, { useState, useMemo, useEffect } from 'react';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';
import { Store, StoreContext } from './store/store';

import './App.css';

function App(): React.ReactElement {
  const [store, setStore] = useState<Store>({ products: [], isAuthorized: false });

  const value = useMemo(() => ({ store, setStore }), [store, setStore]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setStore((prevStore) => ({ ...prevStore, isAuthorized: !!token?.length }));
  }, []);

  return (
    /* <div>
      <div className="sale-offer"> </div> */
      <div className="wrapper">
        <StoreContext.Provider value={value}>
          <MainSectionRouter />
        </StoreContext.Provider>
      </div>
    /* </div> */
  );
}

export default App;
