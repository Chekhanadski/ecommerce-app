import React, { useState, useMemo, useEffect } from 'react';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';
import { Store, StoreContext } from './store/store';
import { getAnonymousToken, generateUUID } from './api/auth';
import { getUserCart, getAnonymousCart } from './api/cart';
import './App.css';

function App(): React.ReactElement {
  const [store, setStore] = useState<Store>({ products: [], isAuthorized: undefined, cartItemCount: 0 });

  const value = useMemo(() => ({ store, setStore }), [store, setStore]);

  useEffect(() => {
    const initializeCartItemCount = async () => {
      const customerId = sessionStorage.getItem('customerId');
      let data;
      try {
        if (customerId) {
          data = await getUserCart();
          setStore((prevStore) => ({ ...prevStore, isAuthorized: true }));
        } else {
          const anonymousId = sessionStorage.getItem('anonymousId') || generateUUID();
          sessionStorage.setItem('anonymousId', anonymousId);
          if (!sessionStorage.getItem('anonymousAccessToken')) {
            const anonymousAccessToken = await getAnonymousToken(anonymousId);
            sessionStorage.setItem('anonymousAccessToken', anonymousAccessToken);
          }
          data = await getAnonymousCart();
          setStore((prevStore) => ({ ...prevStore, isAuthorized: false }));
        }
        const itemCount = data ? data.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
        setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw Error(`Failed to initialize cart item count: ${error.message}`);
        } else {
          throw Error('Failed to initialize cart item count: An unknown error occurred');
        }
      }
    };

    initializeCartItemCount();
  }, [setStore]);

  return (
    <div className="wrapper">
      <StoreContext.Provider value={value}>
        <MainSectionRouter />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
