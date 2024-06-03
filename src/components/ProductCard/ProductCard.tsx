import { IoCartOutline } from 'react-icons/io5';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductData } from '../../store/types/products';
import ImageModal from '../ImageModal/ImageModal';
import styles from './styles.module.css';

function ProductCard({ product, onImageClick }: { product: ProductData; onImageClick: (imageUrl: string) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { productId, productName, productDescription, productImage, fullPrice, discountedPrice } = useMemo(() => {
    if (!product.masterData || !product.masterData.current.masterVariant.prices[0]) {
      return {};
    }

    const productId = product.id;
    const name = product.masterData.current.name['en-US'];
    const description = product.masterData.current.description['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;
    const price = product.masterData.current.masterVariant.prices[0];
    const fullPrice = price.value.centAmount / 100;

    const discountedPrice = price.discounted ? price.discounted.value.centAmount / 100 : undefined;

    function truncate(str: string, num: number) {
      return str.length > num ? `${str.slice(0, num)}...` : str;
    }

    return {
      productId,
      productName: name,
      productDescription: truncate(description, 150),
      productImage: image,
      fullPrice,
      discountedPrice
    };
  }, [product]);

  const openModal = () => {
    console.log('Opening modal...');
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
      <div className={styles.productCard}>
        <img className={styles.productImg} src={productImage} alt={productName} onClick={() => onImageClick(productImage)} />
        <Link className={styles.linkCard} to={`/catalog/${productId}`}>
          <div className={styles.descriptionBlock}>
            <p>{productDescription}</p>
          </div>
        </Link>
        <Link className={styles.linkCard} to="/cart">
          <button type="button" className={styles.productCartButton}>
            <IoCartOutline size={25} />
            <span>Add To Cart</span>
          </button>
        </Link>
        <Link className={styles.linkCard} to={`/catalog/${productId}`}>
          <div className={styles.namePriceBlock}>
            <h3>{productName}</h3>
            <div className={styles.priceBlock}>
              {discountedPrice && <div className={styles.discountedPrice}>{discountedPrice}€</div>}
              <div className={discountedPrice ? styles.priceStriked : styles.price}>{`${fullPrice}€`}</div>
            </div>
          </div>
        </Link>
      </div>
  );
}

export default ProductCard;
