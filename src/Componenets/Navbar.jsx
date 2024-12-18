import React, { useState } from "react";
import { Home, ShoppingCart, User, Search, Heart, Menu, X } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../Redux/Reducers/User.Reducer";
import { signOutThunk } from "../Redux/Reducers/User.Reducer";
import {
  fetchCartItemsThunk,
  fetchOrdersThunk,
} from "../Redux/Reducers/Product.Reducer";
import { searchQuery } from "../Redux/Reducers/Product.Reducer";
import { searchSelector } from "../Redux/Reducers/Product.Reducer";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //   const [activeCategory, setActiveCategory] = useState("all");
  //   const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn } = useSelector(userSelector);
  console.log(isLoggedIn);
  const dispatch = useDispatch();

  const searchTerm = useSelector(searchSelector);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className=" bg-cover bg-center bg-opacity-50 backdrop-blur-sm  w-full h-16  items-center justify-center shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"}>
            <div className="text-2xl font-bold text-blue-600">ShopSphere</div>
          </Link>
          {/* Search Bar */}
          <div className="flex-grow mx-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              className="w-full px-4 bg-white  bg-opacity-20  backdrop-blur-sm placeholder-white py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => dispatch(searchQuery(e.target.value))}
            />
            <Search className="absolute right-4 top-3 text-gray-400" />
          </div>

          {/* Navigation Icons */}
          <nav className="hidden md:flex space-x-4">
            <Link
              to={isLoggedIn ? "/myorders" : "/signup"}
              className="hover:bg-gray-100 p-2 rounded-full flex text-blue-700 font-bold"
              onClick={() => (isLoggedIn ? dispatch(fetchOrdersThunk()) : "")}
            >
              <Heart className="text-blue-700" font-bold />
              Orders
            </Link>
            <Link
              to={isLoggedIn ? "/" : "/signup"}
              className="hover:bg-gray-100 p-2 rounded-full flex text-blue-700 font-bold"
              onClick={() => (isLoggedIn ? dispatch(signOutThunk()) : "")}
            >
              <User className="text-blue-700 font-bold" />
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
            <Link
              to={isLoggedIn ? "/cart" : "/signup"}
              className="hover:bg-gray-100 p-2 rounded-full relative flex text-blue-700 font-bold"
              onClick={() =>
                isLoggedIn ? dispatch(fetchCartItemsThunk()) : ""
              }
            >
              <ShoppingCart className="text-blue-700" font-bold />
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                3
              </span> */}
              Cart
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-4">
              <button className="w-full text-left py-3 border-b flex items-center">
                <Home className="mr-3" /> Home
              </button>
              <button className="w-full text-left py-3 border-b flex items-center">
                <User className="mr-3" /> Profile
              </button>
              <button className="w-full text-left py-3 border-b flex items-center">
                <ShoppingCart className="mr-3" /> Cart
              </button>
              <button className="w-full text-left py-3 border-b flex items-center">
                <Heart className="mr-3" /> Wishlist
              </button>
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Navbar;
