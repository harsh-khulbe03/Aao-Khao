import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const useCart = () => {
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
    console.log("Reducing quantity for item:", itemId);
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
    console.log("API response for decreaseQuantity:", data);

    if (data?.quantity === 0) {
      setCartLength((prev) => prev - 1);
    }

    setIsLoading(false);
    await fetchCartItems();

    return data?.quantity;
  }

  return {
    fetchCartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cartLength,
    cartItems,
    isLoading,
  };
};

export default useCart;
