import React from 'react';
import styles from './styles.module.css';

const categories = [
  'Woman’s Fashion',
  'Men’s Fashion',
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  'Baby’s & Toys',
  'Groceries & Pets',
  'Health & Beauty'
];

function MainPage() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <a key={category} href="placeholder" className={styles.categoryLink}>
            {category}
          </a>
        ))}
      </div>
      <div className={styles.placeholderBanner}>
        <h2>Hello, this is Main Page placeholder</h2>
        <img src="img/main-page-banner-iphones.png" alt="main-page-placeholder" />
      </div>
    </div>
  );
}

export default MainPage;
