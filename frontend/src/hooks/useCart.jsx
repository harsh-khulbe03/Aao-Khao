import { useState } from "react";
import { useToastContext } from "../context/ToastContext";
const apiUrl = import.meta.env.VITE_API_URL;

const useCart = () => {
  const { showToast } = useToastContext();
  const [cartLength, setCartLength] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCartItems() {
    const response = await fetch(`${apiUrl}/api/cartItems`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const cart = await response.json();
    const cartItems = cart?.cartItems.filter((item) => item.quantity > 0);
    setCartItems(cartItems);
    setCartLength(cartItems?.length);
    return cartItems;
  }

  async function addToCart(item) {
    const { itemId, name, description, imageId, price, quantity } = item;
    const cartItem = await fetch(`${apiUrl}/api/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        itemId,
        name,
        description,
        imageId,
        price: Number(price) / 100,
        quantity,
      }),
    });
    setCartItems((prev) => [...prev, cartItem]);
    setCartLength((prev) => prev + 1);
  }

  async function increaseQuantity(item) {
    const { itemId } = item;
    const response = await fetch(`${apiUrl}/api/increaseQuantity`, {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    await fetchCartItems();
    return data?.quantity;
  }

  async function decreaseQuantity(item) {
    const { itemId } = item;
    setIsLoading(true);

    const response = await fetch(`${apiUrl}/api/decreaseQuantity`, {
      method: "DELETE",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    if (data?.quantity === 0) {
      setCartLength((prev) => prev - 1);
    }

    setIsLoading(false);
    await fetchCartItems();

    return data?.quantity;
  }

  async function removeCartItem(itemId) {
    const response = await fetch(`${apiUrl}/api/removeItem`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      showToast("Can't remove the item from the cart");
      return;
    }
    showToast("bg-green-500", "Item removed from the cart");
  }

  return {
    fetchCartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
    cartLength,
    cartItems,
    isLoading,
  };
};

export default useCart;
