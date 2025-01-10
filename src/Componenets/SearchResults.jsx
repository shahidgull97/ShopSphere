import React from "react";
import { Link } from "react-router-dom";

function SearchResults({ searchedProducts, setSearchedProducts }) {
  return (
    <>
      {searchedProducts.length > 0 && (
        <div className=" bg-blue-300 bg-opacity-50 border-white border-2 absolute top-12  h-60 w-full overflow-y-auto scrollbar-width: none; -ms-overflow-style: none">
          {searchedProducts.map((item, index) => (
            <div className="flex" key={item._id}>
              <img
                src={item.image}
                alt={item.title}
                className="object-fit w-9 h-9 rounded-md flex"
              />
              <Link to={`/item/${item._id}`}>
                <div
                  className="p-1 m-1 text-white hover:bg-blue-800 cursor-pointer"
                  key={index}
                  onClick={() => setSearchedProducts([])}
                >
                  {item.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchResults;
