import React, { useContext, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { StoreContext } from '../../store/store';
import { ProductData } from '../../store/types/products';
import ImageModal from '../../components/ImageModal/ImageModal';
import styles from './styles.module.css';

function CatalogPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { setStore } = useContext(StoreContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.results);
      setStore((prevStore) => ({ ...prevStore, products: data.results }));
    };

    fetchProducts();
  }, [setStore]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl); 
  };

  const closeModal = () => {
    setSelectedImage(null); 
  };

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
          products.map((product) => <ProductCard key={product.id} product={product} onImageClick={openModal}/>)
        ) : (
          <div className={styles.spinnerContainer}>
            <span className={styles.spinner} />
          </div>
        )}
      </div>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} show={true} />}
    </main>
  );
}

export default CatalogPage;
