export interface IPizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  doughOptions: string[];
  customizable: boolean;
  rating: number;
  category: string;
}

export interface IPizzaData{
  pizzas: IPizza[]
}

export interface IPizzaDataSingle{
  pizza: IPizza
}

export interface IPizzaStore {
  pizzas: IPizza[];
  filteredPizzas: IPizza[];
  category: string;
  sort: string;
  priceRange: [number, number];
  selectedIngredients: string[];
  doughType: string;

  fetchPizzas: () => Promise<void>;
  initializePizzas?: (pizzas: IPizza[]) => void; 
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleIngredient: (ingredient: string) => void;
  setDoughType: (type: string) => void;
  setFilteredPizzas: (pizzas: IPizza[]) => void;
}
export interface ModalProps extends Partial<IPizzaDataSingle> {
  isOpen: boolean;
  onConfirm: (size: string, dough: string, toppings: string[]) => void;
  onClose: () => void;
}
