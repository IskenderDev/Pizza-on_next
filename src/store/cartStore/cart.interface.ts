
interface CartItem {
    id: string;
    name: string;
    image: string;
    size: string;
    dough: string;
    toppings: string[];
    totalPrice: number;
    quantity: number;
  }
  interface CartStore {
    cart: CartItem[];
    addToCart: (pizza: CartItem) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
  }