import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getProductData from '../../api/products';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductData()
      .then((data: { results: ProductData[] }) => {
        const productFromServer = data.results.find((item) => item.id === productId);
        setProduct(productFromServer || null);
      })
      .catch((error) => {
        setError(`An error occurred: ${error.message}`);
      });
  }, [productId]);

  if (error) {
    return <main className={styles.temporaryClass}>Error: {error}</main>;
  }

  if (!product) {
    return <main className={styles.temporaryClass}>Product not found</main>;
  }

  return (
    <main>
      <h1>{product.masterData.current.name['en-US']}</h1>
      <p>{product.masterData.current.description['en-US']}</p>
      {product.masterData.current.masterVariant.images.length > 0 && (
        <img
          className={styles.productImg}
          src={product.masterData.current.masterVariant.images[0].url}
          alt={product.masterData.current.name['en-US']}
        />
      )}
    </main>
  );
}
