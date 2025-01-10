import React, { useState, useEffect } from "react";
import { Home, ShoppingCart, User, Search, Heart, Menu, X } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../Redux/Reducers/User.Reducer";
import { signOutThunk } from "../Redux/Reducers/User.Reducer";
import {
  fetchCartItemsThunk,
  fetchOrdersThunk,
} from "../Redux/Reducers/Product.Reducer";
import { toggelLogin } from "../Redux/Reducers/User.Reducer";

import SearchResults from "./SearchResults";
import { productsSelector } from "../Redux/Reducers/Product.Reducer";
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const { isLoggedIn } = useSelector(userSelector);

  const dispatch = useDispatch();
  const products = useSelector(productsSelector);

  useEffect(() => {
    async function loginStatus() {
      const result = await fetch(
        "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/user/isloggedin",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (result.ok) {
        dispatch(toggelLogin(true));
      } else {
        console.log("logout should be true");
        dispatch(toggelLogin(false));
      }
    }
    loginStatus();
  }, []);

  // Real time searching of products based on search text price range and catagory
  useEffect(() => {
    if (!searchTerm) {
      // If no filters are applied, show all products
      setSearchedProducts([]);
    } else {
      // Apply filters
      const filteredProducts = products.filter((product) => {
        const matchesSearch =
          !searchTerm.trim() ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
      });
      setSearchedProducts(filteredProducts);
    }
  }, [searchTerm]);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className=" bg-cover bg-center bg-opacity-50   w-full h-16  items-center justify-center shadow-md fixed top-0 left-0 right-0 z-50">
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-3 text-gray-400" />
            <SearchResults
              searchedProducts={searchedProducts}
              setSearchedProducts={setSearchedProducts}
            />
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
