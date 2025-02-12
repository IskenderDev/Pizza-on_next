"use client";
import { usePizzaStore } from "@/store/usePizzaStore";
import React from "react";
import styles from "./style.module.scss";

const TopFilter = () => {
  const categories = [
    "Все",
    "Мясные",
    "Острые",
    "Сладкие",
    "Вегетарианские",
    "С курицей",
  ];
  const { category, setCategory } = usePizzaStore();
  const { sort, setSort } = usePizzaStore();
  return (
    <>
    <h2 className={styles.name}>{category} пиццы</h2>
      <div className={styles.container}>
        <div className={styles.filter}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? styles.active : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.sort}>
          <button className={styles.active} onClick={() => setSort("рейтинг")}>
            рейтингу
          </button>
        </div>
      </div>
    </>
  );
};

export default TopFilter;
