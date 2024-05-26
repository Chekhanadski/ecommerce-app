import React, { useEffect, useState } from 'react';
import getProductData from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';

function CatalogPage() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductData();
      setProducts(data.results);
    };

    fetchProducts();
  }, []);

  return (
    <main className={styles.mainBlock}>
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
