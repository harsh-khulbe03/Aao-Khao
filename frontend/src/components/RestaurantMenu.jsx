import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import Breadcrumb from "./Breadcrumb";
import Star from "../assets/images/Star";
import Carousel from "./Carousel";
import Accordion from "./Accordion";
import MenuCard from "./MenuCard";

const apiUrl = import.meta.env.VITE_API_URL;

const RestaurantMenu = () => {
  const [offersArr, setOffersArr] = useState([]);
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [itemCards, setItemCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [isSearchBtnClicked, setIsSearchBtnClicked] = useState(false);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  function filterMenu(searchText, itemCards) {
    if (!searchText) {
      setIsSearchBtnClicked(false);
      return;
    }
    setIsSearchBtnClicked(true);
    return itemCards.filter((item) => {
      return item?.card?.info?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }

  function getRestaurantInfo() {
    fetch(`${apiUrl}/api/menu/${resId}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        const restaurantInfo = res?.data?.cards[2]?.card?.card?.info;
        const menuData =
          res.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(
            1
          );
        const itemCardsData = menuData?.flatMap(
          (menu) => menu?.card?.card?.itemCards || []
        );
        setRestaurant(restaurantInfo);
        setMenu(menuData || []);
        setItemCards(itemCardsData || []);
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
      <div className="mb-20">
        <input
          type="text"
          placeholder="Search for dishes"
          className="px-64 py-4 ml-80 mr-4 bg-slate-100 text-black font-bold rounded-xl outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="p-4 bg-slate-100 rounded-lg"
          onClick={() => {
            const data = filterMenu(searchText, itemCards);
            setFilteredMenu(data);
          }}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {isSearchBtnClicked ? (
        <div className="flex flex-col gap-10 w-[790px] m-auto mb-20">
          {filteredMenu?.map((item, index) => {
            return <MenuCard key={index} item={item} />;
          })}
        </div>
      ) : (
        <div className="w-[850px] mx-auto mt-10">
          {menu?.map((item, index) => {
            const items = item?.card?.card?.itemCards;
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
      )}
    </>
  );
};

export default RestaurantMenu;
