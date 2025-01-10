import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ECommerceLayout from "./Componenets/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import SignUp from "./Componenets/SignUp";
import CartPage from "./Componenets/Cart";
import OrdersPage from "./Componenets/Orders";
import { Provider } from "react-redux";
import { store } from "./Store";
import ItemDetailPage from "./Componenets/Item";

function App() {
  const [count, setCount] = useState(0);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true, // This marks the default route
          element: <ECommerceLayout />,
        },
        { path: "/signup", element: <SignUp /> },
        { path: "/item/:id", element: <ItemDetailPage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/myorders", element: <OrdersPage /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
        <ToastContainer
          position="top-right" // Default position for notifications
          autoClose={3000} // Automatically close after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </Provider>
    </>
  );
}

export default App;
