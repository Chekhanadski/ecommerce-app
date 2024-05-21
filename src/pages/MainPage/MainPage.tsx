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
          <div key={category} className={styles.categoryLink}>
            {category}
          </div>
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
