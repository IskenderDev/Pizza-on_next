"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { IPizzaDataSingle } from "@/store/pizza.interface";
import { usePizzaStore } from "@/store/usePizzaStore"; // Подключаем хранилище
import styles from "./styles.module.scss";
import Link from "next/link";

const PizzaDetail: NextPage<IPizzaDataSingle> = ({ pizza }) => {
  const [size, setSize] = useState("Маленькая");
  const [dough, setDough] = useState("Традиционное");

  // Получаем пиццы из хранилища Zustand
  const pizzas = usePizzaStore((state) => state.pizzas);
  const fetchPizzas = usePizzaStore((state) => state.fetchPizzas);  // Функция для загрузки пицц

  // Загружаем пиццы при первом рендере
  useEffect(() => {
    if (pizzas.length === 0) {
      fetchPizzas();  // Загружаем пиццы, если они еще не загружены
    }
  }, [pizzas, fetchPizzas]);

  // Рекомендованные пиццы
  const recommendedPizzas = useMemo(() => {
    return pizzas.slice(0, 4);  // Получаем первые 4 пиццы для рекомендаций
  }, [pizzas]);

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

      <button className={styles.backButton} onClick={() => history.back()}>
        ← Назад
      </button>

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

          <button className={styles.addToCart}>
            Добавить в корзину за {pizza.price}₽
          </button>
        </div>
      </div>

      {/* Рекомендации */}
      {recommendedPizzas.length > 0 && (
        <div className={styles.recommendations}>
          <h2>Рекомендуем попробовать</h2>
          <div className={styles.recommendationsList}>
            {recommendedPizzas.map((recPizza) => (
              <Link href={`/pizza/${recPizza.id}`} key={recPizza.id} className={styles.recommendationItem}>
                <Image src={recPizza.image} alt={recPizza.name} width={150} height={150} />
                <span>{recPizza.name}</span>
                <span>{recPizza.price}₽</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaDetail;
