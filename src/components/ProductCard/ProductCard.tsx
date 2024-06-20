import { IoCartOutline } from 'react-icons/io5';
import React, { useMemo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductData } from '../../store/types/products';
import styles from './styles.module.css';
import { addToCart } from '../../api/cart';
import { StoreContext } from '../../store/store';

function ProductCard({ product, onImageClick }: { product: ProductData; onImageClick: (imageUrl: string) => void }) {
  const [loading, setLoading] = useState(false);
  const { setStore } = useContext(StoreContext);

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

  const handleAddToCart = async () => {
    if (!productId) {
      throw new Error(`Product ID is undefined`);
    }

    setLoading(true);
    try {
      const updatedCart = await addToCart(productId);
      const itemCount = updatedCart ? updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
      setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
      if (!updatedCart) {
        throw new Error('Failed to add product to cart');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setStore((prevStore) => ({ ...prevStore, errorMessage: `Error adding product to cart: ${message}` }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.productCard}>
      <img
        className={styles.productImg}
        src={productImage}
        alt={productName}
        onClick={() => (productImage ? onImageClick(productImage) : undefined)}
      />
      <Link className={styles.linkCard} to={productId ? `/catalog/${productId}` : '#'}>
        <div className={styles.descriptionBlock}>
          <p>{productDescription}</p>
        </div>
      </Link>
      <button type="button" className={styles.productCartButton} onClick={handleAddToCart} disabled={loading}>
        {loading ? (
          'Adding...'
        ) : (
          <>
            <IoCartOutline size={25} />
            <span>Add To Cart</span>
          </>
        )}
      </button>
      <Link className={styles.linkCard} to={productId ? `/catalog/${productId}` : '#'}>
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
