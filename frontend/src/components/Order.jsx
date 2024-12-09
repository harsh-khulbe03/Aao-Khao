import OrderItem from "./OrderItem";

function Order({ orderDate, orderItems }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Orders placed on: <span className="text-orange-600">{orderDate}</span>
      </h2>
      <div className="space-y-4">
        {orderItems.map((orderItem, index) => (
          <OrderItem key={index} orderItem={orderItem} />
        ))}
      </div>
    </div>
  );
}

export default Order;
