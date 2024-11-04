import { useState } from "react";
import Logo from "../assets/images/OIP.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOnline } from "../utils/useOnline";

const loggedInUser = () => {
  // API call to check authentication
  return true;
};

const Title = () => (
  <a href="/">
    <img data-testid="logo" src={Logo} alt="logo" className="w-36 h-24 rounded-2xl" />
  </a>
);

const Header = () => {
  const isOnline = useOnline();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center p-4 border-b border-indigo-200 shadow-lg bg-white">
      <Title />

      <div>
        <ul className="flex space-x-8 text-lg font-semibold">
          <Link to="/" className="hover:text-orange-500">
            <li>Home</li>
          </Link>
          <Link to="/about" className="hover:text-orange-500">
            <li>About</li>
          </Link>
          <Link to="/contact" className="hover:text-orange-500">
            <li>Contact</li>
          </Link>
          <Link to="/cart" className="hover:text-orange-500">
            <li data-testid="cart">Cart ({cartItems.length})</li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <span
          data-testid="online-status"
          className={`h-4 w-4 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
          title={isOnline ? "Online" : "Offline"}
        ></span>
        
        {isLoggedInUser ? (
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
            onClick={() => setIsLoggedInUser(false)}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setIsLoggedInUser(true)}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
