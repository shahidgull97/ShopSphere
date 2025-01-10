import React, { useEffect, useState } from "react";
import { addToCartThunk } from "../Redux/Reducers/Product.Reducer";
import { useDispatch } from "react-redux";
import GridApp from "./Spinner";
import { useParams } from "react-router-dom";
const ItemDetailPage = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem(id);
  }, [id]);
  async function fetchItem(productId) {
    try {
      const response = await fetch(
        `https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/product/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        // Extract error message from backend
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const product = await response.json();
      setItem(product.product);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  const dispatch = useDispatch();

  return (
    <>
      {!item ? (
        <GridApp />
      ) : (
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 h-screen w-full p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg shadow-lg w-2/3 h-4/5 max-w-md object-fit"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-normal">
              {/* Title and Category */}
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {item.category}
                </p>
              </div>

              {/* Rating and Count */}
              <div className="flex items-center space-x-4 my-2">
                <div className="flex items-center bg-green-600 p-1 pr-2 pl-2 rounded-lg">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="ml-1 text-white font-semibold">
                    {item.rating[0].rate}
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-500">
                  {item.rating[0].count} reviews
                </span>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-green-500">
                Price ${item.price}
              </div>

              {/* Description */}
              <div className="mt-1 bg-blue-300 p-2 rounded-md">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Description
                </h3>
                <p className="text-black leading-relaxed">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => dispatch(addToCartThunk(item._id))}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailPage;
