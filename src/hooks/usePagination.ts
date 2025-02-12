import { useState } from "react";
import { IPizza } from "@/store/pizza.interface";

export const usePagination = (filteredPizzas: IPizza[], pizzasPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatePizzas = (page: number, filteredPizzas: IPizza[]): IPizza[] => {
    const indexOfLastPizza = page * pizzasPerPage;
    const indexOfFirstPizza = indexOfLastPizza - pizzasPerPage;
    return filteredPizzas.slice(indexOfFirstPizza, indexOfLastPizza);
  };

  const getPaginatedPizzas = (): IPizza[] => {
    return paginatePizzas(currentPage, filteredPizzas);
  };

  return { currentPage, setCurrentPage, getPaginatedPizzas };
};
