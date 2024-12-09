import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useToastContext } from "../context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;
const keyId = import.meta.env.VITE_RAZORPAY_ID_KEY;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { fetchCartItems } = useCartContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({ email: "", phone: "" });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState({});
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isDeliveryInfoSaved, setIsDeliveryInfoSaved] = useState(false);

  async function createOrder() {
    const response = await fetch(`${apiUrl}/api/create-order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderItems: cartItems,
      }),
    });

    if(!response.ok) {
      showToast("bg-red-500","Can't create the order");
    }

    showToast("bg-green-500", "Order created successfully");
  }

  async function clearCart() {
    try {
      const response = await fetch(`${apiUrl}/api/clearCart`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        showToast("bg-red-500", "Unable to clear the cart...");
        return;
      }

      await fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  }

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

    const getDeliveryInfo = async () => {
      const response = await fetch(`${apiUrl}/api/user`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (!data?.user?.address) {
        setIsDeliveryInfoSaved(false);
        return;
      }
      setIsDeliveryInfoSaved(true);
      const { address, city, state, zip } = data?.user;
      setDeliveryInfo({
        address,
        city,
        state,
        zip,
      });
    };

    fetchCart();
    getDeliveryInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userInfo.email) newErrors.email = "Email is required.";
    if (!userInfo.phone) newErrors.phone = "Phone number is required.";
    if (!shippingAddress.address) newErrors.address = "Address is required.";
    if (!shippingAddress.city) newErrors.city = "City is required.";
    if (!shippingAddress.state) newErrors.state = "State is required.";
    if (!shippingAddress.zip) newErrors.zip = "ZIP Code is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!isDeliveryInfoSaved) {
      if (!validateForm()) return;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      if (!userInfo.email || !emailRegex.test(userInfo.email)) {
        showToast("bg-red-500", "Please enter a valid email address.");
        return;
      }

      if (!userInfo.phone || !phoneRegex.test(userInfo.phone)) {
        showToast("bg-red-500", "Please enter a valid 10-digit phone number.");
        return;
      }

      const { address, city, state, zip } = shippingAddress;
      if (!address || !city || !state || !zip) {
        showToast(
          "bg-red-500",
          "Please fill in all the required shipping address fields."
        );
        return;
      }
    }
    try {
      const response = await fetch(`${apiUrl}/api/payment/orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: Number(totalPrice) }),
      });
      const result = await response.json();
      const data = result.data;
      initPay(data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPay = async (data) => {
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
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(res),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data) {
            setIsOrderPlaced(true);
            clearCart();
            showToast("bg-green-500", "Payment Successful...");
            createOrder();
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

  const saveInfo = async () => {
    const response = await fetch(`${apiUrl}/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: userInfo.email,
        phoneNo: userInfo.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
      }),
    });

    if (!response.ok) {
      showToast("bg-red-400", "Please enter the Delivery Info");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { address, city, state, zip } = data?.updatedUser;
    setDeliveryInfo({ address, city, state, zip });
    setIsDeliveryInfoSaved(true);
  };

  return isOrderPlaced ? (
    <div className="flex flex-col justify-center items-center gap-4 mt-28 mb-72">
      <h1 className="text-2xl font-black text-green-600">
        Order Placed Successfully!
      </h1>
      <div class="relative inline-block p-10 rounded-full border-4 border-green-500 flex items-center justify-center animate-checkmark">
        <div class="absolute w-[4px] h-12 bg-green-500 origin-bottom-left transform scale-y-0 rotate-45 animate-stem"></div>
        <div class="absolute w-[4px] h-8 bg-green-500 origin-top-left transform scale-y-0 rotate-[-45deg] top-[2.8rem] left-[1.0rem] animate-kick"></div>
      </div>

      <p className="text-gray-500">
        Thank you for shopping with us. Your order ID is #{orderId}
      </p>

      <button
        className="px-5 py-2 bg-orange-500 text-white rounded"
        onClick={() => navigate("/order")}
      >
        View Orders
      </button>

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
                {item.name} ( X {item.quantity} )
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
      {!isDeliveryInfoSaved ? (
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Information
            </h2>
            <div className="flex flex-col md:flex-row space-x-5">
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-3 w-[580px] border rounded"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="p-3 border rounded w-[580px]"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["address", "city", "state", "zip"].map((field) => (
                <div key={field} className="flex flex-col">
                  <input
                    type="text"
                    name={field}
                    value={shippingAddress[field]}
                    onChange={handleAddressChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="p-3 border rounded"
                  />
                  {errors[field] && (
                    <span className="text-red-500 text-sm">
                      {errors[field]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 text-white font-bold w-32 ml-[1100px] rounded-2xl px-1 py-2 hover:bg-blue-600 transition"
            onClick={saveInfo}
          >
            Save Info
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Delivery Info
            </h2>
            <p>{deliveryInfo.address}</p>
            <p>
              {deliveryInfo.city}, {deliveryInfo.state}
            </p>
            <p>ZIP: {deliveryInfo.zip}</p>
          </div>
          <div>
            <button
              className="bg-white text-blue-500 font-bold border border-1 border-blue-400 px-4 py-2 rounded-lg"
              onClick={() => setIsDeliveryInfoSaved(false)}
            >
              change
            </button>
          </div>
        </div>
      )}

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
