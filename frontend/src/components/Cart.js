import { useSelector } from "react-redux";
import FoodItem from "./FoodItem";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems)
  return (
    <div className="flex">
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <FoodItem key={item.id} {...item.card.info} />
        ))
      ) : (
        <h2 className="font-semibold text-3xl m-5">Your cart is empty</h2>
      )}
      {/* <FoodItem {...cartItems[0]} /> */}
    </div>
  );
};

export default Cart;
