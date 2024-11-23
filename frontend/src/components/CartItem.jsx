import { useState } from "react";
import { IMG_CDN_URL } from "../constant";
import { useCartContext } from "../context/CartContext";
import Logo from "../assets/images/cart.png";

const CartItem = ({
  itemId,
  name,
  description,
  imageId,
  price,
  quantity: initialQuantity,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { fetchCartItems, increaseQuantity, decreaseQuantity, cartLength } =
    useCartContext();

  const handleIncrease = async () => {
    const updatedQuantity = await increaseQuantity({ itemId });
    setQuantity(updatedQuantity);
  };

  const handleDecrease = async () => {
    const updatedQuantity = await decreaseQuantity({ itemId });
    setQuantity(updatedQuantity);
    await fetchCartItems();
  };

  return (
    <div>
      {quantity === 0 ? (
        cartLength === 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 mt-20">
            <img src={Logo} className="h-60 w-60" alt="Cart is empty" />
            <h1 className="text-2xl font-black">Your cart is empty</h1>
            <p className="text-gray-500 font-semibold">
              Browse items to add to your cart.
            </p>
            <button
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
              onClick={() => navigate("/")}
            >
              Browse Restaurants
            </button>
          </div>
        ) : null
      ) : (
        <div className="flex gap-8 items-center bg-white p-4 rounded-lg shadow hover:shadow-md border border-gray-200 transition my-5">
          <div className="flex gap-5">
            <img
              className="w-32 h-32 object-cover rounded-lg"
              src={IMG_CDN_URL + imageId}
              alt={name}
            />

            <div className="flex flex-col w-[600px] gap-2">
              <h3 className="text-lg font-bold text-gray-800">{name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {description}
              </p>
              <div className="mt-2 text-orange-500 font-bold text-xl">
                ₹{price}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="text-black font-bold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
