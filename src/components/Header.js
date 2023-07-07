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
    <img data-testid="logo" src={Logo} alt="logo" className="w-24 h-24" />
  </a>
);

const Header = () => {
  const isOnline = useOnline();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between m-3 border-spacing-1 border-2 border-indigo-100">
      <Title />

      <div>
        <ul className="list-none flex">
          <Link to="/" className="p-7 hover:text-orange-500">
            <li>Home</li>
          </Link>

          <Link to="/about" className="p-7 hover:text-orange-500">
            <li>About</li>
          </Link>

          <Link to="/contact" className="p-7 hover:text-orange-500">
            <li>Contact</li>
          </Link>
          <Link to="/cart" className="p-7 hover:text-orange-500">
            <li data-testid="cart">Cart({cartItems.length})</li>
          </Link>
        </ul>
      </div>

      <h1
        data-testid="online-status"
        className="m-6 h-6 w-6 rounded-full"
        style={
          isOnline ? { backgroundColor: "green" } : { backgroundColor: "red" }
        }
      ></h1>

      {isLoggedInUser ? (
        <button
          className="m-2 hover:text-orange-500"
          onClick={() => setIsLoggedInUser(false)}
        >
          Logout
        </button>
      ) : (
        <button
          className="m-2 hover:text-orange-500"
          onClick={() => setIsLoggedInUser(true)}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
