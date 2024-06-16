import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { getUserCart, getAnonymousCart } from '../../api/cart';
import { Cart } from '../../store/types/cart';
import cartImg from '../../assets/icons/empty-cart.png';
import Button from '../../components/Button/Button';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCart = async () => {
      const customerId = localStorage.getItem('customerId');
      try {
        let data;
        if (customerId) {
          data = await getUserCart();
        } else {
          data = await getAnonymousCart();
        }
        setCart(data);
      } catch (error) {
        throw new Error(`Failed to fetch cart: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (!cart || !cart.lineItems) {
    return (
      <div className={styles.cartComponent}>
        <img className={styles.emptyCartImg} src={cartImg} alt="Empty Cart" />
        <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
        <p className={styles.emptyCartMessage}>Continue shopping to add items to your cart.</p>
        <Link className={styles.catalogLink} to="/catalog">
          Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.cartPage}>
        <div className={styles.cartHeader}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
        {cart.lineItems.map((item) => {
          const name = item.name && item.name['en-US'];
          const { quantity, variant, totalPrice } = item;
          const img = variant.images[0]?.url;
          const price = variant.prices[0];
          const fullPrice = price.value.centAmount / 100;
          const discountedPrice = price.discounted ? price.discounted.value.centAmount / 100 : undefined;

          return (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.product}>
                <img className={styles.cartItemImg} src={img} alt={name} />
                <span>{name}</span>
              </div>
              <div className={styles.price}>{`Price: ${discountedPrice || fullPrice}€`}</div>
              <div className={styles.quantity}>
                <input type="number" value={quantity} min="1" />
              </div>
              <div className={styles.subtotal}>{`${totalPrice.centAmount / 100}€`}</div>
            </div>
          );
        })}
        {cart && cart.totalPrice && (
          <div className={styles.totalPrice}>{`Total Cart Price: ${cart.totalPrice.centAmount / 100}€`}</div>
        )}
        <Button type="button">Order</Button>
      </div>
    </main>
  );
}
