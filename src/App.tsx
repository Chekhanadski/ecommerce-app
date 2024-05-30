import React, { createContext, useState, useMemo, useEffect } from 'react';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';
import { ProductData } from './store/types/products';

import './App.css';

interface Store {
  products: ProductData[];
  isAuthorized: boolean;
}

const initialStoreContextProps: { store: Store; setStore: React.Dispatch<React.SetStateAction<Store>> } = {
  store: { products: [], isAuthorized: false },
  setStore: () => {}
};

export const StoreContext = createContext(initialStoreContextProps);

function App(): React.ReactElement {
  const [store, setStore] = useState<Store>({ products: [], isAuthorized: false });

  const value = useMemo(() => ({ store, setStore }), [store, setStore]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setStore((prevStore) => ({ ...prevStore, isAuthorized: !!token?.length }));
  }, []);

  return (
    <div>
      <div className="sale-offer"> </div>
      <div className="wrapper">
        <StoreContext.Provider value={value}>
          <MainSectionRouter />
        </StoreContext.Provider>
      </div>
    </div>
  );
}

export default App;
