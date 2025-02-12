import PizzaCard from '@/components/pizzaComponents/PizzaCards/PizzaCard';
import { IPizzaData } from '@/store/pizza.interface';
import React, { FC } from 'react';
import styles from './styles.module.scss';

interface PizzaListProps extends IPizzaData {
  onAddToCart: (pizza: any) => void;
}

const PizzaList: FC<PizzaListProps> = ({ pizzas, onAddToCart }) => {
  return (
    <div className={styles.Cards}>
      {pizzas.length > 0 ? (
        pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} />
        ))
      ) : (
        <div>Pizzas not found!</div>
      )}
    </div>
  );
};

export default PizzaList;
