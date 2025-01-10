import React, { useState, useEffect } from "react";
import Carasoule from "./Carasoule";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { addToCartThunk } from "../Redux/Reducers/Product.Reducer";
import { useDispatch } from "react-redux";
import { allProducts } from "../Redux/Reducers/Product.Reducer";

import GridApp from "./Spinner";

const ECommerceLayout = () => {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [activeCategory, setCategory] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/product/products"
    )
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.products);
        setResults(result.products);
        dispatch(allProducts(result.products));
      })
      .catch((error) => console.log(error));
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
          activeCategory == "all" ? true : activeCategory == product.category;
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
                key={category.id}
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
                key={item._id}
                className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
              >
                <Link to={`/item/${item._id}`}>
                  <div
                    // onClick={() => handleItem(item._id)}
                    className="aspect-square relative mb-4 ml-6"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-fit w-[90%] h-[90%] rounded-md"
                    />
                  </div>
                </Link>
                <p className="font-semibold ">{item.title}</p>
                <p className="text-gray-600"></p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold">${item.price}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    onClick={() => dispatch(addToCartThunk(item._id))}
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
