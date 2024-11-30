import { IMG_CDN_URL } from "../constant";
import React, { useState } from "react";
import { useToastContext } from "../context/ToastContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function MenuCard({ item }) {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const addFoodItem = async (item) => {
    const { id, name, imageId } = item?.card?.info;
    const description = item?.card?.info?.description ?? "";
    const price = item?.card?.info?.price ?? item?.card?.info?.defaultPrice;
    const updatedQuantity = await addToCart({
      itemId: id,
      name,
      description,
      imageId,
      price,
    });
    setQuantity(updatedQuantity);
    showToast("bg-green-500", "Item added to cart");
    navigate("/cart");
  };

  const price = item?.card?.info?.price ?? item?.card?.info?.defaultPrice;

  return (
    <div className="flex items-start border-b border-gray-200 pb-4 justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl w-[600px]">
          {item?.card?.info?.name}
        </h3>
        <span className="text-black font-bold">
          ₹{typeof price === "string" ? Number(price) / 100 : price / 100}
        </span>

        {/* Description Handling */}
        {item?.card?.info?.description && (
          <div className="text-gray-500 text-sm mb-2 w-[600px]">
            {item?.card?.info?.description.length < 200 ||
            showFullDescription ? (
              <span>{item?.card?.info?.description}</span>
            ) : (
              <span>
                {item?.card?.info?.description.substring(0, 200)}...
                <button
                  onClick={toggleDescription}
                  className="text-gray-600 font-bold ml-2"
                >
                  ...more
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative inline-block">
        {item?.card?.info?.imageId && (
          <img
            src={IMG_CDN_URL + item?.card?.info?.imageId}
            className="rounded-md mr-4 h-40 w-44"
          />
        )}

        {/* Quantity Buttons */}
        {quantity === 0 ? (
          <button
            className={
              item?.card?.info?.imageId
                ? "absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-green-500 text-xl font-black border border-1 border-gray-400 py-2 px-9 rounded-md"
                : " bg-white text-green-500 text-xl font-black border border-1 border-gray-400 py-2 px-9 rounded-md mr-10"
            }
            onClick={() => addFoodItem(item)}
          >
            ADD
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default MenuCard;
