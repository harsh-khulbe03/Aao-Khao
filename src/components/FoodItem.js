import { IMG_CDN_URL } from "../constant";

const FoodItem = ({ name, description, imageId, price }) => {
  return (
    <div className="border-2 border-gray-100 w-72 p-3 m-5 cursor-pointer bg-lime-50">
      <img className="w-full" src={IMG_CDN_URL + imageId} />
      <h3 className="text-black text-xl">{name}</h3>
      <p className="text-zinc-500 text-sm">{description}</p>
      <h5 className="text-zinc-500">Rs. {price / 100 + ".00"}</h5>
    </div>
  );
};

export default FoodItem;
