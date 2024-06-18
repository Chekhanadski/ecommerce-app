import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import {
  getUserCart,
  getAnonymousCart,
  removeLineItem,
  clearCart,
  updateLineItemQuantity,
  applyDiscountCode
} from '../../api/cart';
import { Cart, LineItem } from '../../store/types/cart';
import cartImg from '../../assets/icons/empty-cart.png';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../store/store';
import Modal from '../../components/Modal/Modal';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { setStore } = useContext(StoreContext);
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean>(true);

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
        const itemCount = data ? data.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
        setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
      } catch (error) {
        setError(`Failed to fetch cart: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setStore]);

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart(null);
      setStore((prevStore) => ({ ...prevStore, cartItemCount: 0 }));
      setIsModalOpen(false);
    } catch (error) {
      setError(`Failed to clear cart: ${error}`);
    }
  };

  const handleRemoveFromCart = async (lineItemId: string) => {
    const customerId = localStorage.getItem('customerId');
    try {
      const updatedCart = await removeLineItem(lineItemId, !customerId);
      setCart(updatedCart);
      const itemCount = updatedCart ? updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
      setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
      if (!updatedCart.lineItems.length) {
        setCart(null);
      }
    } catch (error) {
      setError(`Failed to remove item from cart: ${error}`);
    }
  };

  const handleQuantityChange = async (lineItemId: string, quantity: number) => {
    if (quantity < 1) return;
    const customerId = localStorage.getItem('customerId');
    try {
      const updatedCart = await updateLineItemQuantity(lineItemId, quantity, !customerId);

      setCart(updatedCart);
      const itemCount = updatedCart ? updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
      setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
    } catch (error) {
      setError(`Failed to update item quantity: ${error}`);
    }
  };

  const handleApplyPromoCode = async () => {
    try {
      const updatedCart = await applyDiscountCode(promoCode);
      setCart(updatedCart);
      setPromoCode('');
      setIsPromoCodeValid(true);
      const itemCount = updatedCart ? updatedCart.lineItems.reduce((count, item) => count + item.quantity, 0) : 0;
      setStore((prevStore) => ({ ...prevStore, cartItemCount: itemCount }));
    } catch (error) {
      setIsPromoCodeValid(false);
    }
  };

  const renderCartItem = (item: LineItem) => {
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
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
          />
        </div>
        <div className={styles.subtotal}>{`${totalPrice.centAmount / 100}€`}</div>
        <Button className="removeButton" type="button" onClick={() => handleRemoveFromCart(item.id)}>
          x
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!cart || !cart.lineItems.length) {
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
          <div className={styles.emptyDiv}> </div>
        </div>
        {cart.lineItems.map(renderCartItem)}

        <div className={styles.buttonsBlock}>
          <div className={styles.promoCodeBlock}>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <Button className="inputButton" type="button" onClick={handleApplyPromoCode}>
              Apply
            </Button>
          </div>

          <div className={styles.clearCartBlock}>
            <Button className="clearCartButton" type="button" onClick={() => setIsModalOpen(true)}>
              Clear Shopping Cart
            </Button>
          </div>
        </div>

        {cart.totalPrice && (
          <div className={styles.totalPrice}>{`Total Cart Price: ${cart.totalPrice.centAmount / 100}€`}</div>
        )}
        <Button type="button">Order</Button>
      </div>
      {!isPromoCodeValid && (
        <Modal
          isOpen={!isPromoCodeValid}
          onClose={() => setIsPromoCodeValid(true)}
          title="Invalid Promo Code"
          message="The promo code you entered is invalid or does not exist."
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearCart}
        title="Clear Cart"
        message="Are you sure you want to clear your cart?"
      />
    </main>
  );
}
