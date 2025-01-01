import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Carasoule from "./Carasoule";
import Footer from "./Footer";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebasedb";
import { addToCartThunk } from "../Redux/Reducers/Product.Reducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toggelLogin } from "../Redux/Reducers/User.Reducer";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../Redux/Reducers/Product.Reducer";

import { fetchItem } from "../Redux/Reducers/Product.Reducer";

import GridApp from "./Spinner";

const ECommerceLayout = () => {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [activeCategory, setCategory] = useState("all");
  const navigate = useNavigate();
  // This is used to get data from firestore database on initial render
  const dispatch = useDispatch();
  //   const activeCategory = useSelector(categorySelector);

  function handleItem(item) {
    dispatch(fetchItem(item));
    navigate("/item");
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(toggelLogin(true));
      } else {
        dispatch(toggelLogin(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {
      //   console.log("Current data: ", querySnapshot.data());
      const getExpenses = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      console.log(getExpenses);

      setProducts(getExpenses);
      setResults(getExpenses);
      dispatch(allProducts(getExpenses));
    });
  }, []);

  // Real time searching of products based on search text price range and catagory
  useEffect(() => {
    if (activeCategory == "all") {
      // If no filters are applied, show all products
      setProducts(results);
    } else {
      // Apply filters
      const filteredProducts = results.filter((product) => {
        const matchesCategory =
          activeCategory == "all"
            ? true
            : activeCategory == product.data.category;
        console.log(matchesCategory);

        return matchesCategory;
      });
      setProducts(filteredProducts);
    }
  }, [activeCategory]);

  const categories = [
    { id: "All", label: "all" },
    { id: "Men's Wear", label: "men's clothing" },
    { id: "Womens Wear", label: "women's clothing" },
    { id: "Jewelery", label: "jewelery" },
    { id: "Electronics", label: "electronics" },
  ];

  return (
    <>
      {" "}
      {!products.length > 0 ? <GridApp /> : ""}
      <div className="min-h-screen  bg-slate-400 flex flex-col">
        <Carasoule />
        {/* <SearchResults  /> */}
        {/* Main Content Area */}

        {/* Category Navigation */}
        <div className="container mx-auto px-4 py-2 overflow-x-auto mt-5">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`
                  px-4 py-2 rounded-full text-sm 
                  ${
                    activeCategory === category.label
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
                onClick={() => setCategory(category.label)}
              >
                {category.id}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-grow container mx-auto px-8 pt-10 pb-6">
          {/* Placeholder for product grid or other content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item, index) => (
              <div
                key={item}
                className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
              >
                <div
                  onClick={() => handleItem(item)}
                  className="aspect-square relative mb-4 ml-6"
                >
                  <img
                    src={item.data.image}
                    alt={item.data.title}
                    className="object-fit w-[90%] h-[90%] rounded-md"
                  />
                </div>
                <p className="font-semibold ">{item.data.title}</p>
                <p className="text-gray-600"></p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold">
                    ${item.data.price}
                  </span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    onClick={() => dispatch(addToCartThunk(item))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ECommerceLayout;
