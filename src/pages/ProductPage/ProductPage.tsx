import React, { useEffect, useMemo, useState } from 'react';
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

  const { productName, productDescription, productImage, fullPrice, discountedPrice } = useMemo(() => {
    if (!product || (product && !product.masterData) || !product.masterData.current.masterVariant.prices[0]) {
      return {};
    }

    const productId = product.id;
    const name = product.masterData.current.name['en-US'];
    const description = product.masterData.current.description['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;
    const price = product.masterData.current.masterVariant.prices[0];
    const fullPrice = price.value.centAmount / 100;

    const discountedPrice = price.discounted ? price.discounted.value.centAmount / 100 : undefined;

    return {
      productId,
      productName: name,
      productDescription: description,
      productImage: image,
      fullPrice,
      discountedPrice
    };
  }, [product]);

  if (!product) {
    return <main className={styles.temporaryClass}>Product not found</main>;
  }

  return (
    <main className={styles.mainBlock}>
      {productImage && <img className={styles.productImg} src={productImage} alt={productName} />}
      <div className={styles.informationBlock}>
        <div className={styles.contentBlock}>
          <h1 className={styles.h1}>{productName}</h1>
          <div className={styles.priceBlock}>
            {discountedPrice && <div className={styles.discountedPrice}>{discountedPrice}€</div>}
            <div className={discountedPrice ? styles.priceStriked : styles.price}>{`${fullPrice}€`}</div>
          </div>
          <p>{productDescription}</p>
        </div>
      </div>
    </main>
  );
}
