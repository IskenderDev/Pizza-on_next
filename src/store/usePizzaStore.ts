import { create } from "zustand";
import { IPizzaStore } from "./pizza.interface";
import { PizzaService } from "@/services/pizzaService";

export const usePizzaStore = create<IPizzaStore>((set) => ({
  pizzas: [],
  filteredPizzas: [],
  fetchPizzas: async () => {
    try {
      const pizzas = await PizzaService.fetchPizzas();
      console.log("Обновленные пиццы в хранилище:", pizzas);
      set({ pizzas });
      set({ filteredPizzas: pizzas }); 
    } catch (error) {
      console.error("Ошибка загрузки пицц в хранилище:", error);
    }
  },

  category: "Все",
  setCategory: (category) => set((state) => {
    const filteredPizzas = state.pizzas.filter((pizza) => 
      category === "Все" ? true : pizza.category === category
    );
    return { category, filteredPizzas };
  }),

  sort: "рейтинг",
  setSort: (sort) => set((state) => {
    const sortedPizzas = [...state.filteredPizzas].sort((a, b) => {
      if (sort === "рейтинг") {
        return b.rating - a.rating;
      }
      return 0;
    });
    return { sort, filteredPizzas: sortedPizzas };
  }),

  priceRange: [0, 1950],
  setPriceRange: (range) => set((state) => {
    const filteredPizzas = state.pizzas.filter(
      (pizza) => pizza.price >= range[0] && pizza.price <= range[1]
    );
    return { priceRange: range, filteredPizzas };
  }),

  selectedIngredients: [],
  toggleIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.includes(ingredient)
        ? state.selectedIngredients.filter((i) => i !== ingredient)
        : [...state.selectedIngredients, ingredient],
    })),

  doughType: "Традиционное",
  setDoughType: (type) => set({ doughType: type }),

  setFilteredPizzas: (filteredPizzas) => set({ filteredPizzas }),
}));

