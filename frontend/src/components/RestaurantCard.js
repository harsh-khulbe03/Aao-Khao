import { IMG_CDN_URL } from "../constant";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRating,
  costForTwo,
}) => {
  
  // const {data} = restaurant;
  // const {cloudinaryImageId,name,cuisines,avgRating} = data;
  return (
    <div className="border-2 border-gray-100 w-72 p-3 m-5 cursor-pointer">
      <img className="w-full" src={IMG_CDN_URL + cloudinaryImageId} />
      <h4 className="text-black">{name}</h4>
      <h5 className="text-zinc-500">{cuisines.slice(0, 2).join(" , ")}</h5>
      <span className="bg-green-400 text-white">{avgRating} &#9733;</span>
      <h5 className="text-zinc-500">{costForTwo}</h5>
    </div>
  );
};

export default RestaurantCard;

