import FoodItem from "./CartItem";
import Logo from "../assets/images/cart.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { fetchCartItems, cartLength } = useCartContext();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const cartItems = await fetchCartItems();
    setCartItems(cartItems);
  };

  useEffect(() => {
    fetchCart();
  }, [cartLength]);

  return (
    <div className="flex flex-wrap ml-16">
      {cartItems?.length !== 0 ? (
        cartItems?.map((item) => <FoodItem key={item.id} {...item} />)
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 ml-[570px] mt-20 mb-72">
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
      )}
    </div>
  );
};

export default Cart;
