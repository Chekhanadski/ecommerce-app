import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductData } from '../../api/products';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const data = await getProductData(productId);
        setProduct(data);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <main className={styles.temporaryClass}>Product not found</main>;
  }

  return (
    <main className={styles.mainBlock}>
      {product.masterData.current.masterVariant.images.length > 0 && (
        <img
          className={styles.productImg}
          src={product.masterData.current.masterVariant.images[0].url}
          alt={product.masterData.current.name['en-US']}
        />
      )}
      <div className={styles.informationBlock}>
        <div className={styles.contentBlock}>
          <h1 className={styles.h1}>{product.masterData.current.name['en-US']}</h1>
          <p>{product.masterData.current.description['en-US']}</p>
        </div>
      </div>
    </main>
  );
}
