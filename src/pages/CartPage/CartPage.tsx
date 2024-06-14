import React, { useEffect, useState } from 'react';
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
          <h2 className={styles.emptyCartMessage}>Your cart is empty</h2>
        </div>
      ) : (
        // products go here
        'Your cart is not empty'
      )}
    </main>
  );
}
