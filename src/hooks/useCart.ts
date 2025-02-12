import { useState } from "react";
import { IPizza } from "@/store/pizza.interface";

interface CartItem extends IPizza {
  size: string;
  dough: string;
  toppings: string[];
  quantity: number;
  totalPrice: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);

  const addToCart = (pizza: IPizza, size: string, dough: string, toppings: string[], price: number) => {
    setSelectedPizza(pizza);
  };


  const updateQuantity = (index: number, change: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item, idx) =>
          idx === index
            ? {
                ...item,
                quantity: item.quantity + change,
                totalPrice: item.totalPrice + change * (item.totalPrice / item.quantity),
              }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, updateQuantity, clearCart, selectedPizza, setSelectedPizza };
};
