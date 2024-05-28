import React, { useContext, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import getProductData from '../../api/products';
import { StoreContext } from '../../App';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';

function CatalogPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { setStore } = useContext(StoreContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductData();
      setProducts(data.results);
      setStore({ products: data.results });
    };

    fetchProducts();
  }, [setStore]);

  return (
    <main className={styles.mainBlock}>
      <div className={styles.controlBlock}>
        <label htmlFor="search" className={styles.labelSearch}>
          <input id="search" className={styles.inputSearch} type="search" placeholder="What are you looking for?" />
          <button aria-label="search" className={styles.inputSearchButton} type="button">
            <CiSearch size={20} />
          </button>
        </label>
      </div>
      <div className={styles.products}>
        {products.length ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div>There are no products for now.</div>
        )}
      </div>
    </main>
  );
}

export default CatalogPage;
