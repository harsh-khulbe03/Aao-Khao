import { useEffect, useState } from "react";
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
    const updatedQuantity = await increaseQuantity({
      itemId,
    });
    setQuantity(updatedQuantity);
  };

  const handleDecrease = async () => {
    const updatedQuantity = await decreaseQuantity({
      itemId,
    });
    setQuantity(updatedQuantity);
    await fetchCartItems();
  };

  return (
    <div>
      {quantity === 0 ? (
        cartLength === 0 ? (
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
        ) : (
          <></>
        )
      ) : (
        <div className="w-80 p-5 m-5 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 border border-gray-200">
          <div className="overflow-hidden rounded-t-lg">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={IMG_CDN_URL + imageId}
              alt={name}
            />
          </div>
          <div className="p-4">
            <h3 className="text-black font-bold text-lg truncate">{name}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-orange-500 font-bold text-xl">
                Rs. {price / 100}
              </span>
              <div className="flex items-center space-x-2">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
