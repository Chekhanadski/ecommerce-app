import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { getProductData } from '../../api/products';
import { ProductData } from '../../store/types/products';
import ImageModal from '../../components/ImageModal/ImageModal';
import styles from './styles.module.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Button from '../../components/Button/Button';
import { addToCart, getUserCart, getAnonymousCart, removeLineItem } from '../../api/cart';
import { StoreContext } from '../../store/store';
import Modal from '../../components/Modal/Modal';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);
  const { setStore } = useContext(StoreContext);
  const [isInCart, setIsInCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const data = await getProductData(productId);
        setProduct(data);

        const cart = await (sessionStorage.getItem('customerId') ? getUserCart() : getAnonymousCart());
        if (cart && cart.lineItems.some((item) => item.productId === productId)) {
          setIsInCart(true);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const updatedCart = await addToCart(product.id);
      const itemCount = updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0);
      setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
      setIsInCart(true);
    } catch (error) {
      setError('Failed to add product to cart');
      setIsErrorModalOpen(true);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!product) return;

    try {
      const cart = await (sessionStorage.getItem('customerId') ? getUserCart() : getAnonymousCart());
      const lineItem = cart?.lineItems.find((item) => item.productId === product.id);

      if (lineItem) {
        const updatedCart = await removeLineItem(lineItem.id, !sessionStorage.getItem('customerId'));
        const itemCount = updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0);
        setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
        setIsInCart(false);
        setSuccessMessage('Product successfully removed from the cart.');
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      setError('Failed to remove product from cart');
      setIsErrorModalOpen(true);
    }
  };

  const { productName, productDescription, productImages, fullPrice, discountedPrice } = useMemo(() => {
    if (!product || (product && !product.masterData) || !product.masterData.current.masterVariant.prices[0]) {
      return {};
    }

    const productId = product.id;
    const name = product.masterData.current.name['en-US'];
    const description = product.masterData.current.description['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;
    const images = product.masterData.current.masterVariant.images.map((image) => image.url);
    const price = product.masterData.current.masterVariant.prices[0];
    const fullPrice = price.value.centAmount / 100;
    const discountedPrice = price.discounted ? price.discounted.value.centAmount / 100 : undefined;

    return {
      productId,
      productName: name,
      productDescription: description,
      productImage: image,
      productImages: images,
      fullPrice,
      discountedPrice
    };
  }, [product]);

  if (!product) {
    return (
      <main className={styles.spinnerContainer}>
        <span className={styles.spinner} />
      </main>
    );
  }

  return (
    <main className={styles.mainBlock}>
      <div className={styles.imgBlock}>
        {productImages ? <ImageSlider images={productImages} onImageClick={handleImageClick} /> : null}
      </div>

      <div className={styles.informationBlock}>
        <div className={styles.contentBlock}>
          <h1 className={styles.h1}>{productName}</h1>
          <div className={styles.priceBlock}>
            {discountedPrice ? <div className={styles.discountedPrice}>{discountedPrice}€</div> : null}
            <div className={discountedPrice ? styles.priceStriked : styles.price}>{`${fullPrice}€`}</div>
          </div>
          <p>{productDescription}</p>
          <div className={styles.buttonBlock}>
            <Button type="button" onClick={handleAddToCart} className="clearCartButton" disabled={isInCart}>
              {isInCart ? 'Already in Cart' : 'Add to Cart'}
            </Button>
            {isInCart && (
              <Button type="button" onClick={handleRemoveFromCart} className="clearCartButton">
                Remove from Cart
              </Button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen ? <ImageModal imageUrl={modalImage} onClose={closeModal} /> : null}

      {isErrorModalOpen && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => {
            setIsErrorModalOpen(false);
            setError(null);
          }}
          title="Error"
          message={error || 'An unexpected error occurred'}
          onConfirm={() => {
            setIsErrorModalOpen(false);
          }}
        />
      )}

      {isSuccessModalOpen && (
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            setSuccessMessage(null);
          }}
          title="Success"
          message={successMessage || ''}
        />
      )}
    </main>
  );
}
