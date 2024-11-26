import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import Logo from "../assets/images/cart.png";

const Cart = () => {
  const navigate = useNavigate();
  const { cartLength, cartItems } = useCartContext();
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    console.log(cartItems);
    setTotalPrice(
      cartItems.reduce((accumulator, cartItem) => {
        return accumulator + cartItem.price * cartItem.quantity;
      }, 0)
    );
  }, [cartItems]);

  if (cartLength === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 ml-[130px] mt-28 mb-72">
        <img src={Logo} className="h-60 w-60" alt="cart-image" />
        <h1 className="text-md font-black ">Your cart is empty</h1>
        <p className="text-slate-400 font-bold">
          You can go to the home page to view more restaurants
        </p>
        <button
          className="px-5 py-2 bg-orange-500 text-white"
          onClick={() => navigate("/")}
        >
          SEE RESTAURANTS NEAR YOU
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 mx-auto p-6 max-w-7xl mb-52">
      <div className="flex-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <CartItem key={item.itemId} {...item} />
          ))}
        </div>
      </div>

      <div className="w-full h-72 md:w-1/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Price Summary</h2>
        <div className="text-gray-600 text-sm space-y-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{Number(totalPrice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>₹40.00</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>₹{Number(totalPrice+40).toFixed(2)}</span>
          </div>
        </div>
        <button
          className="mt-6 w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
