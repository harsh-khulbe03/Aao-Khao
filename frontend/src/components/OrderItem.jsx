import { IMG_CDN_URL } from "../constant";

function OrderItem({ orderItem }) {
  const { name, description, imageId, price, quantity } = orderItem;

  return (
    <div className="flex items-center justify-center gap-6 w-[1300px] border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={IMG_CDN_URL + imageId}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-orange-600 font-bold text-md">
              ${price.toFixed(2)}
            </span>
            <span className="ml-4 text-gray-500 text-sm">x{quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
