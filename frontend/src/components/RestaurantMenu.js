import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL, SWIGGY_MENU_API_URL } from "../constant";
import Shimmer from "./Shimmer";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/createSlice";
import RestaurantMenuItems from "./RestaurantMenuItems";

const RestaurantMenu = () => {
  const { resId } = useParams();
  // console.log(resId);
  const [restaurant, setRestaurant] = useState(null);

  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

function getRestaurantInfo() {
    // const data = await fetch(SWIGGY_MENU_API_URL + resId);
    // const json = await data.json();
    fetch(`http://localhost:3002/api/menu/${resId}`).then((response) => {
      return response.json();
    }).then((res) => {
      // console.log(data);
      const menuData = res.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(1);
      setRestaurant(res?.data?.cards[2]?.card?.card?.info);
      setMenu(res.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(1));
      console.log(menuData)
    })
  }
  // console.log(menu);

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="flex border border-slate-400">
      <div>
        <h1 className="font-bold text-2xl">{restaurant.name}</h1>
        <h3>Restaurant id:{resId}</h3>
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
        <h2>City : {restaurant.locality}</h2>
        <span>AvgRating:{restaurant.avgRating} &#9733;</span>
        <h4>Cost for Two :{restaurant.costForTwo / 100}</h4>
      </div>

      <div className="p-2">
        <h1 className="font-bold text-2xl">Menu :</h1>
        {menu?.length === 0 ? (
          <p>No items found</p>
        ) : (
          <ul>
            {menu?.slice(1, -2).map((item, id) => (
              <>
                <li key={id} className="m-9 p-4 border border-black w-full">
                  {item?.card?.card?.title}
                  <button
                    className="bg-green-500 text-white p-2 float-right"
                    onClick={() => addFoodItem(item)}
                  >
                    Add
                  </button>
                </li>
                <RestaurantMenuItems
                  key={item.id}
                  items={item?.card?.card?.itemCards}
                />
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
