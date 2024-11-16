import Logo from "../assets/images/Aaokhao.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const isUserLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-3 py-1 shadow-lg bg-white rounded-b-lg sticky top-0 z-10">
      <a href="/">
        <img
          data-testid="logo"
          src={Logo}
          alt="logo"
          className="w-44 h-20 rounded-xl"
        />
      </a>

      <div>
        <ul className="flex space-x-8 text-lg font-semibold">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/cart">
            <li data-testid="cart">Cart ({cartItems.length})</li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        {!isUserLoggedIn() ? (
          <>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg transition duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg transition duration-200"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-black text-white rounded-lg transition duration-200"
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

