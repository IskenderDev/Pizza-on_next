import { NextPage } from "next";
import Image from "next/image";
import { IPizza } from "@/store/pizza.interface";
import styles from "./styles.module.scss";

const PizzaDetail: NextPage<{ pizza: IPizza }> = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <a href="/">Главная</a> / <span>{pizza.name}</span>
      </nav>
      <div className={styles.pizzaDetails}>
        <div className={styles.imageWrapper}>
          <Image src={pizza.image} alt={pizza.name} width={400} height={400} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{pizza.name}</h1>
          <p className={styles.description}>25 см, традиционное тесто, 380 г</p>
          <div className={styles.options}>
            {pizza.doughOptions.map((option) => (
              <button key={option}>{option}</button>
            ))}
          </div>
          <h3>Ингредиенты</h3>
          <div className={styles.ingredients}>
            {pizza.ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredient}>
                <span>{ingredient}</span>
              </div>
            ))}
          </div>
          <button className={styles.addToCart}>Добавить в корзину за {pizza.price}₽</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
