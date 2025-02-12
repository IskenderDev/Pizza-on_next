import { create } from "zustand";
import { IPizzaStore, IPizza,} from "./pizza.interface";

export const usePizzaStore = create<IPizzaStore>((set) => ({
  
  pizzas: [],
  filteredPizzas: [],

  initializePizzas: (pizzas) => set({ pizzas, filteredPizzas: pizzas }),

  fetchPizzas: async () => {
    try {
      const response = await fetch("/api/pizzas"); 
      const data: IPizza[] = await response.json();
      set({ pizzas: data, filteredPizzas: data });
    } catch (error) {
      console.error("Ошибка загрузки пицц:", error);
    }
  },

  setFilteredPizzas: (filteredPizzas) => set({ filteredPizzas }),

  category: "Все",
  setCategory: (category) =>
    set((state) => {
      const filteredPizzas = state.pizzas.filter((pizza) =>
        category === "Все" ? true : pizza.category === category
      );
      return { category, filteredPizzas };
    }),

  sort: "рейтинг",
  setSort: (sort) =>
    set((state) => {
      const sortedPizzas = [...state.filteredPizzas].sort((a, b) =>
        sort === "рейтинг" ? b.rating - a.rating : 0
      );
      return { sort, filteredPizzas: sortedPizzas };
    }),

  priceRange: [0, 1950],
  setPriceRange: (range) =>
    set((state) => {
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
}));
