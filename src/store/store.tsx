import { createContext } from 'react';
import { ProductData } from './types/products';

export interface Store {
  products: ProductData[];
  isAuthorized: boolean;
}

const initialStoreContextProps: { store: Store; setStore: React.Dispatch<React.SetStateAction<Store>> } = {
  store: { products: [], isAuthorized: false },
  setStore: () => {}
};

export const StoreContext = createContext(initialStoreContextProps);
