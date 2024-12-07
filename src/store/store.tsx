import { createContext } from 'react';
import { ProductData } from './types/products';

export interface Store {
  products: ProductData[];
  isAuthorized?: boolean;
  cartItemCount: number;
}

const initialStoreContextProps: { store: Store; setStore: React.Dispatch<React.SetStateAction<Store>> } = {
  store: { products: [], isAuthorized: undefined, cartItemCount: 0 },
  setStore: () => {}
};

export const StoreContext = createContext(initialStoreContextProps);
