import React, { useEffect, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import getActivePromoCodes from '../../api/promoCodes';
import Modal from '../../components/Modal/Modal';

import styles from './styles.module.css';

const categories = ['Mobile phones', 'Laptops'];

function MainPage() {
  const [loading, setLoading] = useState(true);
  const [promoCodes, setPromoCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const data = await getActivePromoCodes();
        setPromoCodes(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Failed to fetch promo codes: ${error.message}`);
          setIsErrorModalOpen(true);
        } else {
          setError('An unexpected error occurred');
          setIsErrorModalOpen(true);
        }
      }
    };

    fetchPromoCodes();
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.wrapperCategories}>
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li key={category} className={styles.categoryLink}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bannerAndPromoBlock}>
        <div className={styles.placeholderBanner}>
          <div className={styles.textBanner}>
            <FaApple color="white" size={70} />
            <h2>iPhone 14 Series</h2>
          </div>
          {loading && (
            <div className={styles.spinnerContainer}>
              <span className={styles.spinner} />
            </div>
          )}
          <img
            className={styles.imgIphone}
            src="img/iphone.jpg"
            alt="main-page-placeholder"
            onLoad={handleImageLoad}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>

        <div className={styles.promoCodesSection}>
          <h2>Active Promo Codes</h2>
          {error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <ul className={styles.promoCodes}>
              {promoCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isErrorModalOpen && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => {
            setIsErrorModalOpen(false);
            setError(null);
          }}
          title="Error"
          message={error || 'An unexpected error occurred'}
        />
      )}
    </div>
  );
}

export default MainPage;
