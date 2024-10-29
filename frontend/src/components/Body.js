import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
require('dotenv').config();

// const API_URL = process.env.NEXT_PUBLIC_API_URL
// const apiUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL;
const apiUrl = process.env.REACT_APP_API_URL
console.log(apiUrl);
function filterData(searchText, restaurants) {
  const filterdata = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(filterdata);
  return filterdata;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    fetch(`${apiUrl}/api/restaurants`)  
      .then(response =>
        response.json())
      .then(result => {
        setAllRestaurants(result.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurants(result.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      })

      .catch(error => console.log('Error fetching data: ', error))
  }

  if (!allRestaurants) return null;

  // if (filteredRestaurants.length === 0)
  //   return <h2>No restaurants matches your Filter!!</h2>;

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="flex mt-7 mb-7 items-center">
        <input
          type="text"
          className="h-12 w-1/2 p-3 outline-none border-2 border-stone-500 ml-96"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          data-testid="search-btn"
          className="h-12 w-12 cursor-pointer m-3 rounded border-none bg-black text-white"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="flex justify-start flex-wrap w-[1380px] m-auto">
        {filteredRestaurants?.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
              className="card-link"
            >
              <RestaurantCard {...restaurant.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
