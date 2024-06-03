import React from 'react';
import { FaApple } from 'react-icons/fa';
import styles from './styles.module.css';

const categories = ['Mobile phones', 'Laptops'];

function MainPage() {
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

        <div className={styles.placeholderBanner}>
          <div className={styles.textBanner}>
            <FaApple color="white" size={70} />
            <h2>iPhone 14 Series</h2>
          </div>
          <img className={styles.imgIphone} src="img/iphone.jpg" alt="main-page-placeholder" />
        </div>
      </div>
  );
}

export default MainPage;
