import { IMG_CDN_URL } from "../constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/createSlice";
import React, { useState } from "react";

function MenuCard({ item }) {
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
        <div className="flex items-center text-sm text-green-500 gap-1">
          {item?.card?.info?.ratings?.aggregatedRating?.rating && (
            <span style={{ color: "#126d44" }}>
              <i class="fa-solid fa-star"></i>
            </span>
          )}
          <span>
            {item?.card?.info?.ratings?.aggregatedRating?.rating
              ? item?.card?.info?.ratings?.aggregatedRating?.rating
              : null}
          </span>
          {item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 ? (
            <span className="text-gray-400">
              ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
            </span>
          ) : null}
        </div>
        {item?.card?.info?.description ? (
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
            {showFullDescription && (
              <button
                onClick={toggleDescription}
                className="text-gray-600 font-bold ml-2"
              >
                Show less
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div className="relative inline-block">
        {item?.card?.info?.imageId && (
          <img
            src={IMG_CDN_URL + item?.card?.info?.imageId}
            className="rounded-md mr-4 h-40 w-44"
          />
        )}

        <button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-green-500 text-xl font-black border border-1 border-gray-400 py-2 px-9 rounded-md"
          onClick={() => addFoodItem(item)}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
export default MenuCard;
