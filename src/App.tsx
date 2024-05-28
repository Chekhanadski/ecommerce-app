import React, { createContext, useState, useMemo } from 'react';
import MainSectionRouter from './router/MainSectionRouter/MainSectionRouter';
import { ProductData } from './store/types/products';

import './App.css';

interface Store {
  products: ProductData[];
}

const initialStoreContextProps: { store: Store; setStore: React.Dispatch<React.SetStateAction<Store>> } = {
  store: { products: [] },
  setStore: () => {}
};

export const StoreContext = createContext(initialStoreContextProps);

function App(): React.ReactElement {
  const [store, setStore] = useState<Store>({ products: [] });

  const value = useMemo(() => ({ store, setStore }), [store, setStore]);

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
