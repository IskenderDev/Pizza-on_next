"use client";

import React from "react";
import styles from "./CartModal.module.scss";

interface CartItem {
  id: string; 
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>В корзине {cartItems.length} товаров</h2>
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} width={50} height={50} />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>{item.price} ₽</span>
                  <span className={styles.itemQuantity}>Кол-во: {item.quantity}</span>
                </div>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Удалить</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
