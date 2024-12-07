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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const { setStore } = useContext(StoreContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(currentPage, 4);
      setProducts(data.results);
      setTotal(Math.ceil(data.total / 4));
      setStore((prevStore) => ({ ...prevStore, products: data.results }));
    };

    fetchProducts();
  }, [setStore, currentPage]);

  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, total));
  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

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
          products.map((product) => <ProductCard key={product.id} product={product} onImageClick={openModal} />)
        ) : (
          <div className={styles.spinnerContainer}>
            <span className={styles.spinner} />
          </div>
        )}
      </div>
      <div className={styles.paginationControls}>
        <button type="button" className={styles.pageButton} onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {total}
        </span>
        <button type="button" className={styles.pageButton} onClick={goToNextPage} disabled={currentPage === total}>
          Next
        </button>
      </div>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
    </main>
  );
}

export default CatalogPage;
