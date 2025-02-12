"use client";

import React from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import PizzaList from "@/components/pizzaList/PizzaList";
import Pagination from "@/components/pagination/pagination";
import Cart from "@/components/cart/Cart";
import Modal from "@/components/ModalPizza";
import { usePagination } from "@/hooks/usePagination";
import { useCart } from "@/hooks/useCart";
import { IPizzaData } from "@/store/pizza.interface";
import { useFilteredPizzas } from "@/hooks/useFilteredPizzas";

const MainPage: React.FC<IPizzaData> = ({ pizzas }) => {
  const filteredPizzas = useFilteredPizzas(pizzas);
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
    </div>
  );
};

export default MainPage;
