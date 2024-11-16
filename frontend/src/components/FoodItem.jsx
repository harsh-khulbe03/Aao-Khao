import { IMG_CDN_URL } from "../constant";
import React, {useState} from "react";

const FoodItem = ({ name, description, imageId, price }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
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
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-orange-500 font-bold text-xl">
            Rs. {price / 100}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="text-black font-bold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
