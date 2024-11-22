import { createContext, useContext } from "react";
import useCart from "../hooks/useCart";


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const CartAPI = useCart();
  return (
    <CartContext.Provider value={CartAPI}>{children}</CartContext.Provider>
  );
};

const useCartContext = () => {
  const data = useContext(CartContext);
  if (!data) {
    throw new Error("useCartContext should only be used within CartProvider.");
  }
  return data;
};

export { CartProvider, useCartContext };