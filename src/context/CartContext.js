import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify"; // Import toast notifications

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // ✅ Ensure Toast fires only once by moving it inside addToCart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setCartCount((prevCount) => prevCount + quantity);

    // ✅ Move toast here so it's only triggered once per addToCart call
    toast.success(`${quantity}x ${product.title} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
