"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IPizzaDataSingle } from "@/store/pizza.interface";
import { usePizzaStore } from "@/store/usePizzaStore"; 
import styles from "./styles.module.scss";
import Link from "next/link";
import PizzaList from "../pizzaList/PizzaList";
import { usePizzaCustomization } from "@/hooks/usePizzaCustomization";  

const PizzaDetail: NextPage<IPizzaDataSingle> = ({ pizza }) => {
  const [size, setSize] = useState("Маленькая");
  const [dough, setDough] = useState("Традиционное");
  const pizzas = usePizzaStore((state) => state.pizzas);
  const fetchPizzas = usePizzaStore((state) => state.fetchPizzas);

  const onClose = () => {
    console.log("Modal closed");
  };

  const {
    toppings,
    handleToppingChange,
    toppingsData,
    calculateTotalPrice,
    handleConfirm,
  } = usePizzaCustomization(pizza, onClose);

  useEffect(() => {
    if (pizzas.length === 0) {
      fetchPizzas();
    }
  }, [pizzas, fetchPizzas]);

  const onAddToCart = (pizza: any) => {
    console.log(pizza);
  };

  const limitedPizzas = pizzas.slice(0, 4);

  if (pizzas.length === 0) {
    return (
      <div className={styles.container}>
        <p>Загружаем пиццы...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link href="/">Главная</Link> / <span>{pizza.name}</span>
      </nav>

      <div className={styles.pizzaDetails}>
        <div className={styles.imageWrapper}>
          <Image src={pizza.image} alt={pizza.name} width={400} height={400} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{pizza.name}</h1>
          <p className={styles.description}>{pizza.description}</p>

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

          <button className={styles.addToCart} onClick={handleConfirm}>
            Добавить в корзину за {calculateTotalPrice()}₽
          </button>
        </div>
      </div>
      <h2 className={styles.rec}>Рекомендации</h2>
      <PizzaList pizzas={limitedPizzas} onAddToCart={onAddToCart} />
    </div>
  );
};

export default PizzaDetail;
