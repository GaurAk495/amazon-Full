import { useDispatch, useSelector } from "react-redux";
import "../pages/css/amazon-header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { setUserLoginStatus } from "../store/LogStatusSlice";

function Header() {
  const cart = useSelector((store) => store.cart);
  // console.log(cart);
  const cartQuantity = cart.length;
  const searchInputElem = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((store) => store.logStaus?.status);
  const { username } = useSelector((store) => store.logStaus.user);

  function userSearchingProduct() {
    const search = searchInputElem.current.value;
    const searchInLowerCase = search.toLowerCase();
    navigate(`?searchProduct=${searchInLowerCase}`);
    searchInputElem.current.value = "";
  }

  function handleOnLogout() {
    localStorage.removeItem("token");
    setTimeout(() => {
      console.log("loggout");
      dispatch(
        setUserLoginStatus({ isLoggedIn: false, userInfo: { username: "" } })
      );
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-[#131921] text-white">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            className="h-8 hidden md:block"
            src="images/amazon-logo-white.png"
            alt="Amazon Logo"
          />
          <img
            className="h-8 md:hidden"
            src="images/amazon-mobile-logo-white.png"
            alt="Amazon Mobile Logo"
          />
        </NavLink>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex flex-grow mx-4 max-w-2xl">
        <div className="flex w-full bg-white rounded-md overflow-hidden border border-transparent focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-400">
          <input
            className="flex-grow p-2 text-black focus:outline-none"
            type="text"
            placeholder="Search Amazon"
            ref={searchInputElem}
            onKeyDown={(e) => {
              if (e.key === "Enter") userSearchingProduct();
            }}
          />
          <button
            onClick={userSearchingProduct}
            className="bg-yellow-400 px-4 flex items-center justify-center"
          >
            <img
              className="w-5 h-5"
              src="images/icons/search-icon.png"
              alt="Search"
            />
          </button>
        </div>
      </div>

      {/* Right: Account / Orders / Cart */}
      <div className="flex items-center space-x-6 text-xs">
        {/* Account with dropdown */}
        <div className="relative group px-2 text-left cursor-pointer">
          <NavLink to="/Login" className="leading-tight">
            <span className="block">
              Hello, {isUserLoggedIn ? username : "Sign In"}
            </span>
            <span className="font-bold">Account & Lists</span>
          </NavLink>
          {/* Dropdown */}
          <div className="absolute hidden group-hover:flex flex-col bg-white text-black shadow-lg p-4 top-full right-0 w-64 z-50">
            <NavLink to="/profile" className="py-1 hover:underline">
              Your Account
            </NavLink>
            <NavLink to="/order" className="py-1 hover:underline">
              Your Orders
            </NavLink>
            <NavLink to="/checkout" className="py-1 hover:underline">
              Wishlist
            </NavLink>
            {isUserLoggedIn ? (
              <button className="py-1 hover:underline" onClick={handleOnLogout}>
                Sign Out
              </button>
            ) : (
              <Link to="/Login">Sign In</Link>
            )}
          </div>
        </div>

        {/* Orders */}
        <NavLink to="/order" className="px-2 leading-tight text-left">
          <span className="block">Returns</span>
          <span className="font-bold">& Orders</span>
        </NavLink>

        {/* Cart */}
        <NavLink
          to="/checkout"
          className="relative flex items-center px-2 hover:outline hover:outline-offset-0"
        >
          <div className="relative">
            <span className="absolute bg-yellow-400 bottom-[55%] left-[58%] -translate-x-1/2  text-black rounded-full px-1 text-xs font-bold">
              {cartQuantity}
            </span>
            <img className="w-10" src="images/icons/cart-icon.png" alt="Cart" />
          </div>
          <span className="font-bold text-sm ml-1 self-end">Cart</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
