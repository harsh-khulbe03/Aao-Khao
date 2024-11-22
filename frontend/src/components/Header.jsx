import Logo from "../assets/images/AaoKhao_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { useCartContext } from "../context/CartContext";
import { useEffect, useState } from "react";

const isUserLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const Header = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { fetchCartItems, cartLength } = useCartContext();
  const [updatedCartLength, setUpdatedCartLength] = useState(cartLength);

  const fetchCart = async () => {
    try {
      const response = await fetchCartItems();
      setUpdatedCartLength(response?.length);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [cartLength]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("bg-green-500", "Logout Successful");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-3 py-1 shadow-lg sticky top-0 z-10 bg-gray-800">
      <a href="/">
        <img
          data-testid="logo"
          src={Logo}
          alt="logo"
          className="w-40 h-24 rounded-xl"
        />
      </a>

      {isUserLoggedIn() ? (
        <div>
          <ul className="flex space-x-8 text-lg font-semibold px-10 py-3 rounded-md">
            <Link to="/" className="text-orange-400">
              <li>Home</li>
            </Link>
            <Link to="/about" className="text-orange-400">
              <li>About</li>
            </Link>
            <Link to="/contact" className="text-orange-400">
              <li>Contact</li>
            </Link>
            <Link to="/cart" className="text-orange-400">
              <li data-testid="cart">Cart ({updatedCartLength})</li>
            </Link>
          </ul>
        </div>
      ) : null}

      <div className="flex items-center space-x-4">
        {!isUserLoggedIn() ? (
          <>
            <button
              className="px-4 py-2 bg-orange-400 text-white rounded-lg transition duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-orange-400 text-white rounded-lg transition duration-200"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 mr-4 bg-orange-400 text-white rounded-lg transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
