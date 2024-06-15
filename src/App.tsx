import React, { useState, useMemo, useEffect } from 'react';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';
import { Store, StoreContext } from './store/store';
import { getAnonymousToken, generateUUID } from './api/auth';

import './App.css';

function App(): React.ReactElement {
  const [store, setStore] = useState<Store>({ products: [], isAuthorized: undefined });

  const value = useMemo(() => ({ store, setStore }), [store, setStore]);

  useEffect(() => {
    const token = localStorage.getItem('customerId');
    if (token) {
      setStore((prevStore) => ({ ...prevStore, isAuthorized: true }));
    } else {
      const anonymousId = localStorage.getItem('anonymousId') || generateUUID();
      localStorage.setItem('anonymousId', anonymousId);

      getAnonymousToken(anonymousId)
        .then((anonymousAccessToken) => {
          localStorage.setItem('anonymousAccessToken', anonymousAccessToken);
          setStore((prevStore) => ({ ...prevStore, isAuthorized: false }));
        })
        .catch((error) => {
          console.error('Error getting anonymous token:', error);
        });
    }
  }, []);

  return (
    <div className="wrapper">
      <StoreContext.Provider value={value}>
        <MainSectionRouter />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
