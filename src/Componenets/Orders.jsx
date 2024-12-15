import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Check,
  X,
  Clock,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector } from "../Redux/Reducers/Product.Reducer";
import GridApp from "./Spinner";
import { fetchOrdersThunk } from "../Redux/Reducers/Product.Reducer";
const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // State to control spinner visibility
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchOrdersThunk());
  //   }, []);

  const neworders = useSelector(orderSelector);
  console.log(neworders);

  const orderStatuses = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  // This useEffect is for the spinner duration and message which shows
  useEffect(() => {
    // Set a timer to stop showing the spinner after a few seconds

    const timer = setTimeout(() => {
      setLoading(false); // Hide spinner after 3 seconds
    }, 1000); // Adjust the duration (in milliseconds) as needed

    // Clear the timer if the component unmounts before timeout
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <Check className="text-green-500" />;
      case "Shipped":
        return <Truck className="text-blue-500" />;
      case "Processing":
        return <Clock className="text-yellow-500" />;
      case "Cancelled":
        return <X className="text-red-500" />;
      default:
        return <RefreshCw className="text-gray-500" />;
    }
  };

  //   const filteredOrders = orders.filter(
  //     (order) =>
  //       (activeFilter === "All" || order.status === activeFilter) &&
  //       order.id.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <>
      {" "}
      {loading && Object.keys(neworders).length === 0 ? <GridApp /> : ""}
      <div className="min-h-screen bg-blue-200 py-12 px-4 ">
        <div className="container mx-auto max-w-6xl mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold flex items-center">
              <Package className="mr-4 text-blue-600" />
              My Orders
            </h1>
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filters */}
          {/* <div className="flex space-x-2 mb-8">
            {orderStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`
                px-4 py-2 rounded-full flex items-center space-x-2
                ${
                  activeFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              >
                {getStatusIcon(status)}
                <span>{status}</span>
              </button>
            ))}
          </div> */}

          {/* Orders List */}
          {Object.entries(neworders).map(([date, items]) => (
            <div className="space-y-6 mb-10">
              {items.map((result) => (
                <div
                  key={date}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden"
                >
                  {/* Order Header */}

                  <div className="flex justify-between items-center p-6 bg-gray-100">
                    <div>
                      <p className="text-gray-500">Order Number</p>
                      <h3 className="font-bold">{result.orderId}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        {/* {getStatusIcon(orderStatus)} */}
                        <span className="font-semibold">
                          {result.orderStatus}
                        </span>
                      </div>
                      <span className="text-gray-500">|</span>
                      <span>{date}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {result.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-6 pb-4 
                      border-b last:border-b-0"
                        >
                          <div className="w-24 h-24 rounded-lg overflow-hidden">
                            <img
                              src={item.data.image}
                              alt={item.data.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold">{item.data.title}</h4>
                            <p className="text-gray-500">
                              Quantity: {item.Qnt}
                            </p>
                          </div>
                          <div className="font-bold">
                            ${(item.Qnt * item.data.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-10">
                      <span className="flex items-center font-bold">
                        <Truck className="mr-2 text-green-500" />
                        Shipping
                      </span>
                      <span className="font-bold">$15.00</span>
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center p-6 bg-gray-100">
                    <div>
                      <p className="text-gray-500">Total Spent</p>
                      <h3 className="font-bold text-xl">
                        ${(result.totalAmount + 15).toFixed(2)}
                      </h3>
                    </div>
                    <div className="space-x-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                        View Details
                      </button>
                      {"orderstatus" === "Processing" && (
                        <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* No Orders State */}
          {Object.keys(neworders).length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <Package className="mx-auto mb-6 text-gray-300" size={64} />
              <h3 className="text-2xl font-bold mb-4">No Orders Found</h3>
              <p className="text-gray-500">
                You haven't placed any orders yet. Start shopping and track your
                purchases here!
              </p>
              <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
