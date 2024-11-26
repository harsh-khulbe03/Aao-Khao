import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function filterData(searchText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const elementRef = useRef(null);
  const [page, setPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants();
  }, []);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      fetchMoreRestaurants();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [allRestaurants]);

  async function getRestaurants() {
    try {
      const response = await fetch(`${apiUrl}/api/restaurants`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();

      if (result.message === "User is not authorized") {
        navigate('/login');
        return; // Exit the function
      }

      const restaurants =
        result.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      
      setAllRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function fetchMoreRestaurants() {
    try {
      const response = await fetch(`${apiUrl}/api/update/${page}`);
      const result = await response.json();
      const newRestaurants =
        result?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setAllRestaurants((existingRestaurants) => [
        ...existingRestaurants,
        ...newRestaurants,
      ]);
      setFilteredRestaurants((existingRestaurants) => [
        ...existingRestaurants,
        ...newRestaurants,
      ]);
      setPage(page + 15);
    } catch (error) {
      console.error("Error fetching more restaurants:", error);
    }
  }

  if (!allRestaurants) return null;

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-orange-50">
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
      <div className="flex justify-start flex-wrap w-[1380px] ml-32">
        {filteredRestaurants?.map((restaurant, index) => {
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
      <div ref={elementRef} className="text-center">
        <Shimmer />
      </div>
    </div>
  );
};

export default Body;
