import { IoCartOutline } from "react-icons/io5";
import React, { useMemo } from 'react';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';


function ProductCard({ product }: { product: ProductData }) {
  const { productName, productDescription, productImage } = useMemo(() => {
    const name = product.masterData.current.name['en-US'];
    const description = product.masterData.current.description['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;

    function truncate(str: string, num: number) {
      return str.length > num ? `${str.slice(0, num)}...` : str;
    }

    return {
      productName: name,
      productDescription: truncate(description, 150),
      productImage: image
    };
  }, [product]);

  return (
    <div className={styles.productCard}>
      <img className={styles.productImg} src={productImage} alt={productName} />
      <div className={styles.descriptionBlock}>
      <p>{productDescription}</p>
      </div>     
      <div className={styles.productCartBlock}><IoCartOutline size={25}/><span>Add To Cart</span></div>
      <h3>{productName}</h3>
      <div className={styles.priceBlock}>Price:</div>
    </div>
  );
}

export default ProductCard;
