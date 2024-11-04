import { IMG_CDN_URL } from "../constant";

const FoodItem = ({ name, description, imageId, price }) => {
  return (
    <div className="border-2 border-gray-100 w-72 p-5 m-5 cursor-pointer bg-slate-300 rounded-xl">
      <img className="w-full rounded-lg" src={IMG_CDN_URL + imageId} />
      <h3 className="text-black text-xl mt-2">{name}</h3>
      <p className="text-zinc-500 text-sm">{description}</p>
      <h5 className="text-zinc-500">Rs. {price / 100}</h5>
    </div>
  );
};

export default FoodItem;
