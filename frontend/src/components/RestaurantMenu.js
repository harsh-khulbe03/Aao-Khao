import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantMenuItems from "./RestaurantMenuItems";
import Breadcrumb from "./Breadcrumb";
import Star from "../assets/images/Star";
import Carousel from "./Carousel";
import Accordion from "./Accordion";

const apiUrl = process.env.REACT_APP_API_URL;

const RestaurantMenu = () => {
  const [offersArr, setOffersArr] = useState([]);
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  function getRestaurantInfo() {
    fetch(`${apiUrl}/api/menu/${resId}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setRestaurant(res?.data?.cards[2]?.card?.card?.info);
        setMenu(
          res.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(
            1
          )
        );
        setOffersArr(
          res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
        );
      });
  }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <>
      <Breadcrumb restaurant={restaurant} />

      <h1 className="font-black text-2xl px-96 my-7">{restaurant?.name}</h1>

      <div className=" w-[850px] h-40  p-4 m-auto border-2 border-slate-100 shadow-xl shadow-slate-200 rounded-3xl font-black">
        <div className="flex space-x-2">
          <Star width="20" height="20" />
          <span>{restaurant?.totalRatingsString}</span>
          <span className="font-bold text-2xl leading-none">·</span>
          <span>{restaurant?.costForTwoMessage}</span>
        </div>

        <div>
          {restaurant?.cuisines.map((cuisine) => {
            return (
              <span className="text-orange-600 mx-1 text-sm underline">
                {cuisine}{" "}
              </span>
            );
          })}
        </div>

        <div className="flex items-start space-x-3 mt-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-8 border-l-2 border-gray-300"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-black text-sm">Outlet</span>
              <span className="text-slate-500 text-sm">
                {restaurant?.areaName || "Sector 8"}
              </span>
              <span className="text-orange-500">▼</span>
            </div>
            <div className="text-black font-semibold text-sm mt-1">
              {
                restaurant?.nearestOutletNudge?.nearestOutletInfo?.siblingOutlet
                  ?.sla?.slaString
              }
            </div>
          </div>
        </div>
      </div>

      <Carousel heading="Deals for you" offersArr={offersArr} />

      <h1 className="font-bold text-slate-500 text-lg ml-[700px] mt-10 tracking-widest mb-3">
        Menu
      </h1>

      <div>
        <input
          type="text"
          placeholder="Search for dishes"
          className="px-64 py-4 ml-80 mr-4 bg-slate-100 text-black font-bold rounded-xl outline-none"
        />
        <button className="p-4 bg-slate-100 rounded-lg">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="w-[850px] mx-auto mt-10">
        {menu?.map((item, index) => {
          const items = item?.card?.card?.itemCards;

          // Only render the accordion if there are items inside
          return (
            items?.length > 0 && (
              <Accordion
                key={index}
                title={item?.card?.card?.title}
                items={items}
              />
            )
          );
        })}
      </div>
    </>
  );
};

export default RestaurantMenu;
