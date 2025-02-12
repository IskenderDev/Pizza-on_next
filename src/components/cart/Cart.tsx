import React from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import styles from "./styles.module.scss";

const Cart = () => {
  const { cart, updateQuantity, clearCart } = useCart();

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cart.map((pizza, index) => (
            <li key={pizza.id} className={styles.cartItem}>
              <Image
                src={pizza.image}
                width={50}
                height={50}
                alt={pizza.name}
                className={styles.cartImage}
              />
              {`${pizza.name} — ${pizza.size}, ${pizza.dough}, ${pizza.totalPrice}₽ x ${pizza.quantity}`}
              {pizza.toppings.length > 0 && (
                <span> (Добавки: {pizza.toppings.join(", ")})</span>
              )}
              <button onClick={() => updateQuantity(index, 1)}>+</button>
              <button onClick={() => updateQuantity(index, -1)}>-</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && <button onClick={clearCart}>Очистить корзину</button>}
    </div>
  );
};

export default Cart;
