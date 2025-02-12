"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { ModalProps } from "@/store/pizza.interface";
import { usePizzaCustomization } from "@/hooks/usePizzaCustomization";

const ModalPizza: React.FC<ModalProps> = ({ isOpen, pizza, onClose }) => {
  if (!isOpen || !pizza) return null;

  const {
    size,
    setSize,
    dough,
    setDough,
    toppings,
    handleToppingChange,
    toppingsData,
    calculateTotalPrice,
    handleConfirm,
  } = usePizzaCustomization(pizza, onClose);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.imageSection}>
          {pizza.image && (
            <Image
              src={pizza.image}
              width={300}
              height={300}
              alt={pizza.name || ""}
              className={styles.pizzaImage}
            />
          )}
        </div>

        <div className={styles.contentSection}>
          <h3 className={styles.title}>{pizza.name}</h3>

          <div className={styles.optionsGroup}>
            {["Маленькая", "Средняя", "Большая"].map((option) => (
              <button
                key={option}
                className={`${styles.optionButton} ${size === option ? styles.active : ""}`}
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
                className={`${styles.optionButton} ${dough === option ? styles.active : ""}`}
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
                  className={`${styles.toppingItem} ${toppings.includes(topping.name) ? styles.active : ""}`}
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

export default ModalPizza;
