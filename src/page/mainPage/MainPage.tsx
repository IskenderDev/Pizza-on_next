"use client";

import React, { useEffect } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import PizzaList from "@/components/pizzaList/PizzaList";
import Pagination from "@/components/pagination/pagination";
import Cart from "@/components/cart/Cart";
import Modal from "@/components/ModalPizza";
import { usePagination } from "@/hooks/usePagination";
import { useCart } from "@/hooks/useCart";
import { usePizzaStore } from "@/store/usePizzaStore";
import { IPizza } from "@/store/pizza.interface";

const MainPage: React.FC<{ pizzas: IPizza[] }> = ({ pizzas }) => {
  const { initializePizzas, filteredPizzas } = usePizzaStore();

  useEffect(() => {
    initializePizzas(pizzas); 
  }, [pizzas, initializePizzas]);

  const { currentPage, setCurrentPage, getPaginatedPizzas } = usePagination(
    filteredPizzas,
    6
  );
  const { addToCart, selectedPizza, setSelectedPizza } = useCart();

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
        title={selectedPizza?.name}
        price={selectedPizza?.price || 0}
        image={selectedPizza?.image || ""}
        onConfirm={(size, dough, toppings) => {
          setSelectedPizza(null);
        }}
        onClose={() => setSelectedPizza(null)}
      />
      <Cart />
    </div>
  );
};

export default MainPage;
