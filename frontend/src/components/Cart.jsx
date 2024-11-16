import { useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import Logo from "../assets/images/cart.png";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems)
  return (
    <div className="flex flex-wrap ml-16">
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <FoodItem key={item.id} {...item.card.info} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 ml-[570px] mt-20 mb-72">
          <img src={Logo} className="h-60 w-60" alt="cart-image" />
          <h1 className="text-md font-black ">Your cart is empty</h1>
          <p className="text-slate-400 font-bold">You can go to home page to view more restaurants</p>
          <button className="px-5 py-2 bg-orange-500 text-white" onClick={() => navigate("/")}>SEE RESTAURANTS NEAR YOU</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
