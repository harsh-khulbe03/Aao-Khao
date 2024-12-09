import { useEffect, useState } from "react";
import Order from "./Order";
import { useToastContext } from "../context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;

function Orders() {
  const [groupedOrders, setGroupedOrders] = useState({});
  const { showToast } = useToastContext();

  useEffect(() => {
    getAllOrders();
  }, []);

  async function getAllOrders() {
    try {
      const response = await fetch(`${apiUrl}/api/orders`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        showToast(
          "bg-red-500",
          "No orders found. Please order something first!"
        );
        return;
      }
      const data = await response.json();
      const grouped = groupOrdersByDate(data?.orders || []);
      setGroupedOrders(grouped);
    } catch (error) {
      console.log(error);
    }
  }

  function groupOrdersByDate(orders) {
    return orders.reduce((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(...order.orderItems);
      return acc;
    }, {});
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        Your Orders
      </h1>
      {Object.keys(groupedOrders).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedOrders).map(([date, items], index) => (
            <Order key={index} orderDate={date} orderItems={items} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          You have no orders yet. Start ordering now!
        </div>
      )}
    </div>
  );
}

export default Orders;
