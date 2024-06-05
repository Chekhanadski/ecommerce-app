import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getProductData } from '../../api/products';
import { ProductData } from '../../store/types/products';
import ImageModal from '../../components/ImageModal/ImageModal';
import styles from './styles.module.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const data = await getProductData(productId);
        setProduct(data);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { productName, productDescription, productImage, productImages, fullPrice, discountedPrice } = useMemo(() => {
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
      {productImages ? <ImageSlider images={productImages}/> : null}
      {productImage ? (
        <img className={styles.productImg} src={productImage} alt={productName} onClick={handleImageClick} />
      ) : null}
      <div className={styles.informationBlock}>
        <div className={styles.contentBlock}>
          <h1 className={styles.h1}>{productName}</h1>
          <div className={styles.priceBlock}>
            {discountedPrice ? <div className={styles.discountedPrice}>{discountedPrice}€</div> : null}
            <div className={discountedPrice ? styles.priceStriked : styles.price}>{`${fullPrice}€`}</div>
          </div>
          <p>{productDescription}</p>
        </div>
      </div>
      {isModalOpen ? <ImageModal imageUrl={productImage} onClose={closeModal} /> : null}
    </main>
  );
}
