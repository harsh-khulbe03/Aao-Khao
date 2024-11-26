import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import Logo from "../assets/images/cart.png";
import { useToastContext } from "../context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;
const keyId = import.meta.env.VITE_RAZORPAY_ID_KEY;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { fetchCartItems } = useCartContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
      const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity + 40,
        0
      );
      setTotalPrice(subtotal);
    };
    fetchCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (data) => {
    setOrderId(data.id);
    const options = {
      key: keyId,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (res) => {
        try {
          const response = await fetch(`${apiUrl}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(res),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data) {
            setIsOrderPlaced(true);
            showToast("bg-green-500", "Payment Successful...");
          }
        } catch (error) {
          console.log("Error verifying payment:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const placeOrder = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/payment/orders`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ amount: Number(totalPrice) }),
      });
      const result = await response.json();
      const data = result.data;
      initPay(data);
    } catch (error) {
      console.log(error);
    }
  };

  return isOrderPlaced ? (
    <div className="flex flex-col justify-center items-center gap-4 mt-28">
      <img src={Logo} className="h-40 w-40" alt="cart-image" />
      <h1 className="text-2xl font-black text-green-600">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-500">
        Thank you for shopping with us. Your order ID is #{orderId}
      </p>
      <button
        className="px-5 py-2 bg-orange-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-6 mx-auto p-6 max-w-7xl mb-20">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.itemId} className="flex justify-between py-2">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-3 border rounded"
          />
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="p-3 border rounded"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleAddressChange}
            placeholder="Address"
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            placeholder="City"
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleAddressChange}
            placeholder="State"
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="zip"
            value={shippingAddress.zip}
            onChange={handleAddressChange}
            placeholder="ZIP Code"
            className="p-3 border rounded"
          />
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
