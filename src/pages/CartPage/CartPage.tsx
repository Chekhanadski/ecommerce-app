import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import cartImg from '../../assets/icons/empty-cart.png';

export default function CartPage() {
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    // if no new products loaded leave it as true
    setIsCartEmpty(true);
  }, []);

  return (
    <main className={styles.cartComponent}>
      {isCartEmpty ? (
        <div>
          <img className={styles.emptyCartImg} src={cartImg} alt="Empty Cart" />
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartMessage}>Continue shopping to add items to your cart.</p>
          <Link className={styles.catalogLink} to="/catalog">
            Go to Catalog
          </Link>
        </div>
      ) : (
        // products go here
        'Your cart is not empty'
      )}
    </main>
  );
}
