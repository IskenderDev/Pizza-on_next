"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/usePizzaStore";
import styles from "./style.module.scss";
import CheeseSide from "./img/cheese side.png";
import Mozzarella from "./img/creamy mozzarella.png";
import Parmesan from "./img/Cheddar and Parmesan cheeses.png";
import { ModalProps } from "@/store/pizza.interface";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  price = 0,
  image,
  onClose,
}) => {
  const [size, setSize] = useState("Маленькая");
  const [dough, setDough] = useState("Традиционное");
  const [toppings, setToppings] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  const toppingsData = [
    { name: "Сырный бортик", price: 179, img: CheeseSide },
    { name: "Сливочная моцарелла", price: 79, img: Mozzarella },
    { name: "Сыр чеддер и пармезан", price: 79, img: Parmesan },
  ];

  const handleToppingChange = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((item) => item !== topping)
        : [...prev, topping]
    );
  };

  if (!isOpen) return null;

  const calculateTotalPrice = () => {
    const toppingsTotal = toppings.reduce((sum, topping) => {
      const item = toppingsData.find((t) => t.name === topping);
      return item ? sum + item.price : sum;
    }, 0);
    return price + toppingsTotal;
  };

  const handleConfirm = () => {
    addToCart({
      id: `${title}-${size}-${dough}`,
      name: title!,
      size,
      dough,
      toppings,
      image: image || "",
      totalPrice: calculateTotalPrice(),
      quantity: 1,
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.imageSection}>
          {image && (
            <Image
              src={image}
              width={300}
              height={300}
              alt={title || ""}
              className={styles.pizzaImage}
            />
          )}
        </div>

        <div className={styles.contentSection}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.optionsGroup}>
            {["Маленькая", "Средняя", "Большая"].map((option) => (
              <button
                key={option}
                className={`${styles.optionButton} ${
                  size === option ? styles.active : ""
                }`}
                onClick={() => setSize(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={styles.optionsGroup}>
            {["Традиционное", "Тонкое"].map((option) => (
              <button
                key={option}
                className={`${styles.optionButton} ${
                  dough === option ? styles.active : ""
                }`}
                onClick={() => setDough(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={styles.toppingsGroup}>
            <h4>Добавить по вкусу:</h4>
            <div className={styles.toppingsList}>
              {toppingsData.map((topping) => (
                <div
                  key={topping.name}
                  className={`${styles.toppingItem} ${
                    toppings.includes(topping.name) ? styles.active : ""
                  }`}
                  onClick={() => handleToppingChange(topping.name)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={topping.img}
                    alt={topping.name}
                    className={styles.toppingImage}
                  />
                  <span>{topping.name}</span>
                  <span>{topping.price}₽</span>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.confirmButton} onClick={handleConfirm}>
            Добавить в корзину за {calculateTotalPrice()}₽
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
