import React from 'react';
import styles from './styles.module.css';

const categories = ['Mobile phones', 'Laptops'];

function MainPage() {
  return (
    <div>
      <div className={styles.mainSection}>
        <div className={styles.wrapperCategories}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <div key={category} className={styles.categoryLink}>
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.placeholderBanner}>
          <h2>Hello, this is Main Page placeholder</h2>
          <img src="img/main-page-banner-iphones.png" alt="main-page-placeholder" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
