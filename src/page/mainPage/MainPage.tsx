"use client";

import React, { useEffect } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import PizzaList from "@/components/pizzaComponents/pizzaList/PizzaList";
import Pagination from "@/components/pagination/pagination";
import Modal from "@/components/modalPizza/ModalPizza";
import { usePagination } from "@/hooks/usePagination";
import { useCart } from "@/hooks/useCart";
import { usePizzaStore } from "@/store/usePizzaStore";
import { IPizza } from "@/store/pizza.interface";


const MainPage: React.FC<{ pizzas: IPizza[] }> = ({ pizzas }) => {
  const { initializePizzas, filteredPizzas } = usePizzaStore();

  useEffect(() => {
    initializePizzas?.(pizzas);
  }, [pizzas, initializePizzas]);

  const { currentPage, setCurrentPage, getPaginatedPizzas } = usePagination(
    filteredPizzas,
    6
  );
  const { selectedPizza, setSelectedPizza } = useCart();

  return (
    <div>
      <TopFilter />
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <PizzaList
          pizzas={getPaginatedPizzas()}
          onAddToCart={setSelectedPizza}
        />
      </div>
      <Pagination
        page={currentPage}
        totalPages={Math.ceil(filteredPizzas.length / 6)}
        onPageChange={setCurrentPage}
      />
      <Modal
        isOpen={!!selectedPizza}
        pizza={selectedPizza || { name: "", price: 0, image: "" }} 
        onClose={() => setSelectedPizza(null)}
      />
    </div>
  );
};

export default MainPage;
