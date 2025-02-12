"use client";
import { usePizzaStore } from "@/store/usePizzaStore";
import styles from "./styles.module.scss";

const ingredientsList = [
  "Сырный соус",
  "Моцарелла",
  "Чеснок",
  "Солёные огурчики",
  "Красный лук",
  "Томаты",
];

export default function SidebarFilter() {
  const {
    priceRange,
    setPriceRange,
    selectedIngredients = [],
    toggleIngredient,
    doughType,
    setDoughType,
  } = usePizzaStore();

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Фильтрация</h2>
      <div className={styles.filterBlock}>
        <label>
          <input type="checkbox" />
          Можно собирать
        </label>
        <label>
          <input type="checkbox" />
          Новинки
        </label>
      </div>

      <div className={styles.filterBlock}>
        <p>Цена от и до:</p>
        <div className={styles.priceRange}>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <span>—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>
      </div>

      <div className={styles.filterBlock}>
        <p>Ингредиенты:</p>
        {ingredientsList.map((ing) => (
          <label key={ing}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ing)} 
              onChange={() => toggleIngredient(ing)}
            />
            {ing}
          </label>
        ))}
      </div>

      <div className={styles.filterBlock}>
        <p>Тип теста:</p>
        <label>
          <input
            type="radio"
            name="dough"
            value="Традиционное"
            checked={doughType === "Традиционное"}
            onChange={() => setDoughType("Традиционное")}
          />
          Традиционное
        </label>
        <label>
          <input
            type="radio"
            name="dough"
            value="Тонкое"
            checked={doughType === "Тонкое"}
            onChange={() => setDoughType("Тонкое")}
          />
          Тонкое
        </label>
      </div>

      <button className={styles.applyButton}>Применить</button>
    </aside>
  );
}
