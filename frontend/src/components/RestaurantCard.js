import { IMG_CDN_URL } from "../constant";
import Star from "../assets/images/Star.js";

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, avgRating, sla, areaName }) => {
  return (
    <div className="w-72 p-3 m-2 cursor-pointer">
      <img
        className="w-full h-48 rounded-xl"
        src={IMG_CDN_URL + cloudinaryImageId}
      />
      <div className="pl-3">
        <h4 className="text-black font-extrabold text-lg">
          {name.slice(0, 21)}
          {name.length > 22 ? "..." : ""}
        </h4>
        <div className="flex items-center space-x-1">
          <Star width="20" height="20" />
          <span className="text-black font-bold">{avgRating}</span>
          <span className="font-bold text-2xl leading-none">·</span>
          <span className="text-black font-bold">{sla?.slaString}</span>
        </div>

        <h5 className="text-zinc-500 font-bold">
          {cuisines.slice(0, 2).join(" , ")}
        </h5>
        <h5 className="text-zinc-500 font-bold">{areaName}</h5>
      </div>
    </div>
  );
};

export default RestaurantCard;
