import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Gift,
  Tag,
  Truck,
} from "lucide-react";
import {
  cartSelector,
  fetchCartItemsAction,
  removeCartItemThunk,
  addOrderThunk,
  clearUserCartThunk,
  fetchOrdersThunk,
  totalPriceSelector,
  addToCartThunk,
} from "../Redux/Reducers/Product.Reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import GridApp from "./Spinner";

const CartPage = () => {
  const [shipping, setShipping] = useState(15);
  //   const [cartItems, setCartItems] = useState([
  //     {
  //       id: 1,
  //       name: "Modern Wireless Headphones",
  //       price: 199.99,
  //       quantity: 1,
  //       image: "/api/placeholder/300/300",
  //       color: "Midnight Black",
  //       size: "Standard",
  //     },
  //     {
  //       id: 2,
  //       name: "Leather Laptop Backpack",
  //       price: 129.99,
  //       quantity: 2,
  //       image: "/api/placeholder/300/300",
  //       color: "Vintage Brown",
  //       size: "Large",
  //     },
  //   ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
  console.log(cartItems);
  const totalAmount = useSelector(totalPriceSelector);
  console.log(totalAmount);
  function navOrders() {
    if (cartItems.length > 0) {
      dispatch(addOrderThunk());
      dispatch(clearUserCartThunk());
      dispatch(fetchOrdersThunk());
      navigate("/myorders");
    } else {
      toast.info("Plese Add Items to the cart");
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 200 ? 0 : 15;
    return subtotal + shipping;
  };
  console.log(cartItems);

  return (
    <>
      <div className="bg-[url('/Images/shoppingCart.jpg')]  bg-cover bg-center min-h-screen bg-gray-50 py-12 px-4 ">
        <div className="container mx-auto max-w-6xl mt-20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Cart Items */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold flex items-center">
                  <ShoppingCart className="mr-3 text-blue-600" />
                  Your Cart
                </h2>
                <span className="text-gray-500">{cartItems.length} Items</span>
              </div>

              {!cartItems.length > 0 ? (
                <h1 className="font-bold text-3xl text-center">
                  Cart is Empty
                </h1>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b py-6 hover:bg-gray-50 transition"
                  >
                    <div className="w-24 h-24 mr-6 rounded-lg overflow-hidden">
                      <img
                        src={item.data.image}
                        alt={item.data.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">
                        {item.data.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-4">
                          <button
                            onClick={() => dispatch(removeCartItemThunk(item))}
                            className="bg-gray-200 p-1 rounded-l-full"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 bg-gray-100">
                            {item.Qnt}
                          </span>
                          <button
                            onClick={() => dispatch(addToCartThunk(item))}
                            className="bg-gray-200 p-1 rounded-r-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeCartItemThunk(item))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-xl">
                      ${(item.data.price * item.Qnt).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full md:w-1/3">
              <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
                <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

                {/* Promo Code */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Tag className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="bg-transparent flex-grow focus:outline-none"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                    Apply
                  </button>
                </div>

                {/* Order Details */}
                <div className="space-y-2 border-b pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="mr-2 text-green-500" />
                      Shipping
                    </span>
                    <span>{calculateSubtotal() > 200 ? "Free" : "$15.00"}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <Gift className="mr-2" />
                      Discount
                    </span>
                    <span>-$0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${(totalAmount + shipping).toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={navOrders}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
                >
                  <CreditCard className="mr-2" />
                  Proceed to Checkout
                </button>
              </div>

              {/* Free Shipping Indicator */}
              {calculateSubtotal() <= 200 && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4 text-center">
                  Add ${(200 - calculateSubtotal()).toFixed(2)} more to get FREE
                  shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
