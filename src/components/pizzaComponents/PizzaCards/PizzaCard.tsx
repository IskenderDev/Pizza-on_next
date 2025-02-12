import styles from "./style.module.scss";
import Image from "next/image";
import { IPizza, IPizzaDataSingle } from "@/store/pizza.interface";
import Link from "next/link";

interface IPizzaDataCard extends IPizzaDataSingle{
    pizza: IPizza;
    onAddToCart: (pizza: IPizza) => void;
}
const PizzaCard: React.FC<IPizzaDataCard> = ({ pizza, onAddToCart }) => {
  return (
    <>
      <div className={styles.card}>
        {" "}
        <Link href={`/pizza/${pizza.id}`}>
          <div className={styles.image}>
            {pizza.image && pizza.image.trim() !== "" ? (
              <Image
                src={pizza.image}
                alt={pizza.name || "Пицца"}
                width={221}
                height={221}
              />
            ) : (
              <Image
                src="/placeholder.png"
                alt="Пицца не найдена"
                width={221}
                height={221}
              />
            )}
          </div>
        </Link>
        <div className={styles.textCard}>
          <h1 className={styles.name}>{pizza.name}</h1>
          <p className={styles.description}>{pizza.description}</p>
          <div className={styles.bottomWrapper}>
            <h3 className={styles.price}>От {pizza.price} ₽</h3>
            <button  onClick={() => onAddToCart(pizza)} className={styles.addBtn}>+ Добавить</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PizzaCard;