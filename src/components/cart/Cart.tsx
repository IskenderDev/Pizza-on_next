"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss"
import Box from '../../../public/img/box.svg'
import { useCartStore } from "@/store/cartStore/useCartStore";
const Cart = () => {
  const { cart, updateQuantity, clearCart } = useCartStore();


  const totalPrice = cart.reduce((sum, pizza) => sum + pizza.quantity * pizza.totalPrice, 0);
  const tax = Math.round(totalPrice * 0.05);

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <div className={styles.Container}>
          <Image src={Box} alt="" width={200} height={200}/>
          <h2>Корзина пустая</h2>
          <p>Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
        </div>
      ) : (
        <>
          <ul>
            {cart.map((pizza) => (
              <li key={`${pizza.id}-${pizza.size}-${pizza.dough}-${pizza.toppings.join(",")}`} className={styles.cartItem}>
                <div className={styles.content}>
                  <div className={styles.cartImage}>
                    <Image src={pizza.image} width={65} height={65} alt={pizza.name} />
                  </div>
                  <div className={styles.cartDetails}>
                    <span className={styles.name}>{pizza.name}</span>
                    <div className={styles.description}>
                      <span>{pizza.size}, {pizza.dough}</span>
                      {pizza.toppings.length > 0 && <span> + {pizza.toppings.join(", ")}</span>}
                    </div>
                  </div>
                </div>
                <div className={styles.priceWrapper}>
                  <div className={styles.cartControls}>
                    <button onClick={() => updateQuantity(pizza.id, -1)}>-</button>
                    <span>{pizza.quantity}</span>
                    <button onClick={() => updateQuantity(pizza.id, 1)}>+</button>
                  </div>
                  <div>
                    <span>{pizza.quantity * pizza.totalPrice}₽</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button className={styles.clearButton} onClick={clearCart}>
            Очистить корзину
          </button>
          
  
          <div className={styles.sum}>
            <div className={styles.summary}>
              <div className={styles.total}>
                <span>Итого:</span>
                <span>{totalPrice} ₽</span>
              </div>
              <div className={styles.tax}>
                <span>Налог 5%:</span>
                <span>{tax} ₽</span>
              </div>
            </div>

            <button className={styles.orderButton} onClick={() => alert("Заказ оформлен!")}>
              Оформить заказ →
            </button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default Cart;
