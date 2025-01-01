import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchItem } from "../Redux/Reducers/Product.Reducer";
import { useDispatch } from "react-redux";

function SearchResults({ searchedProducts, setSearchedProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleItem(item) {
    dispatch(fetchItem(item));
    setSearchedProducts([]);
    navigate("/item");
  }

  return (
    <>
      {searchedProducts.length > 0 && (
        <div className=" bg-blue-300 bg-opacity-50 border-white border-2 absolute top-12  h-60 w-full overflow-y-auto scrollbar-width: none; -ms-overflow-style: none">
          {searchedProducts.map((item, index) => (
            <div className="flex">
              <img
                src={item.data.image}
                alt={item.data.title}
                className="object-fit w-9 h-9 rounded-md flex"
              />
              <div
                className="p-1 m-1 text-white hover:bg-blue-800 cursor-pointer"
                key={index}
                onClick={() => handleItem(item)}
              >
                {item.data.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchResults;
