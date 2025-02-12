import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/usePizzaStore";
import styles from "./styles.module.scss";

const Cart = () => {
  const { cart, updateQuantity, clearCart } = useCartStore();

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cart.map((pizza) => (
            <li key={`${pizza.id}-${pizza.size}-${pizza.dough}-${pizza.toppings.join(",")}`} className={styles.cartItem}>
              <Image
                src={pizza.image}
                width={50}
                height={50}
                alt={pizza.name}
                className={styles.cartImage}
              />
              <div className={styles.cartDetails}>
                <span>
                  {pizza.name} — {pizza.size}, {pizza.dough}, {pizza.totalPrice}₽ x {pizza.quantity}
                </span>
                {pizza.toppings.length > 0 && (
                  <span> (Добавки: {pizza.toppings.join(", ")})</span>
                )}
              </div>
              <div className={styles.cartControls}>
                <button onClick={() => updateQuantity(pizza.id, 1)}>+</button>
                <button onClick={() => updateQuantity(pizza.id, -1)}>-</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button className={styles.clearButton} onClick={clearCart}>
          Очистить корзину
        </button>
      )}
    </div>
  );
};

export default Cart;
