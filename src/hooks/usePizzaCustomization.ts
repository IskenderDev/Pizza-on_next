import { useState } from "react";
import { useCartStore } from "@/store/cartStore/useCartStore";
import { ModalProps } from "@/store/pizza.interface";
import CheeseSide from "../../public/img/cheese side.png";
import Mozzarella from "../../public/img/creamy mozzarella.png";
import Parmesan from "../../public/img/Cheddar and Parmesan cheeses.png";

export const usePizzaCustomization = (pizza: ModalProps["pizza"] | undefined, onClose: () => void) => {
  const [size, setSize] = useState("Маленькая");
  const [dough, setDough] = useState("Традиционное");
  const [toppings, setToppings] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  const toppingsData = [
    { name: "Сырный бортик", price: 179, img: CheeseSide },
    { name: "Сливочная моцарелла", price: 79, img: Mozzarella },
    { name: "Сыр чеддер и пармезан", price: 79, img: Parmesan },
  ];

  const handleToppingChange = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping) ? prev.filter((item) => item !== topping) : [...prev, topping]
    );
  };

  const calculateTotalPrice = () => {
    const toppingsTotal = toppings.reduce((sum, topping) => {
      const toppingData = toppingsData.find(item => item.name === topping);
      return toppingData ? sum + toppingData.price : sum;
    }, 0);
    return pizza ? pizza.price + toppingsTotal : 0;
  };

  const handleConfirm = () => {
    if (pizza) {
      addToCart({
        id: `${pizza.name}-${size}-${dough}`,
        name: pizza.name,
        size,
        dough,
        toppings,
        image: pizza.image,
        totalPrice: calculateTotalPrice(),
        quantity: 1,
      });
    }
    onClose();
  };

  return {
    size,
    setSize,
    dough,
    setDough,
    toppings,
    handleToppingChange,
    toppingsData,
    calculateTotalPrice,
    handleConfirm,
  };
};
