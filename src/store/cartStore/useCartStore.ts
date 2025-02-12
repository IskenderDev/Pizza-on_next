import { create } from "zustand";

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
  
    addToCart: (pizza) =>
      set((state) => {
        const existingItem = state.cart.find(
          (item) =>
            item.id === pizza.id &&
            item.size === pizza.size &&
            item.dough === pizza.dough &&
            JSON.stringify(item.toppings) === JSON.stringify(pizza.toppings)
        );
  
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item === existingItem ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
  
        return { cart: [...state.cart, { ...pizza, quantity: 1 }] };
      }),
  
    updateQuantity: (id, delta) =>
      set((state) => ({
        cart: state.cart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + delta } : item
          )
          .filter((item) => item.quantity > 0),
      })),
  
    clearCart: () => set({ cart: [] }),
  }));
  