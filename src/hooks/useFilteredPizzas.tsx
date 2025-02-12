import { useEffect } from "react";
import { usePizzaStore } from "@/store/usePizzaStore";
import { IPizza } from "@/store/pizza.interface";

export const useFilteredPizzas = (pizzas: IPizza[]) => {
  const { category, priceRange, sort, setFilteredPizzas } = usePizzaStore();

  useEffect(() => {
    const filtered = pizzas.filter(({ category: c, price }) =>
      (category === "Все" || c === category) && price >= priceRange[0] && price <= priceRange[1]
    );

    const sorted = sort === "рейтинг" ? [...filtered].sort((a, b) => b.rating - a.rating) : filtered;

    setFilteredPizzas(sorted);
  }, [category, priceRange, sort, pizzas]);

  return usePizzaStore().filteredPizzas;
};
