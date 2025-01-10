import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
// Initial state using the adapter
const initialState = {
  cartItems: [],
  loading: false,
  orders: [],
  products: [],
};

// Async thunk to fetch cart items from Firestore
export const fetchCartItemsThunk = createAsyncThunk(
  "cart/fetchCartItems",

  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/cart/getCartItems/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            // Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        // Extract error message from backend
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const result = await response.json();
      // thunkAPI.dispatch(fetchCartItemsAction(result.CartItems));
      return result.CartItems;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

// / Async thunk to add or update a cart item in Firestore
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (productId, { getState }) => {
    try {
      const result = await fetch(
        `https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/cart/addToCart/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!result.ok) {
        // Extract error message from backend
        const errorData = await result.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const addItem = await result.json();

      toast.success("Item added to cart");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }
);
// Remove cart Item
export const removeCartItemThunk = createAsyncThunk(
  "cart/removeItem",
  async (productId) => {
    try {
      const response = await fetch(
        `https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/cart//deleteCartItem/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        // Extract error message from backend
        console.log("does it come here");

        const errorData = (await response).json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return (await response).json();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  }
);

// This is to add orders
export const addOrderThunk = createAsyncThunk(
  "cart/addOrder",
  async (_, { getState }) => {
    try {
      const response = await fetch(
        `https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/order/addorders`,
        {
          method: "POST",
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
      return (await response).json();
    } catch (error) {
      toast.error(error.message);
    }
  }
);

// This is to fetch all the orders placed
export const fetchOrdersThunk = createAsyncThunk(
  "cart/fetchorders",
  async () => {
    try {
      const response = await fetch(
        "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/order/getorders",
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
        console.log("it should throw error");

        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const result = await response.json();
      // console.log(result.Orders);

      return result.Orders;
    } catch (error) {
      toast.error(error.message);
      console.log("this is the error", error.message);

      return null;
    }
  }
);
// clear user Cart (This function clears user cart after an order has been placed)
export const clearUserCartThunk = createAsyncThunk(
  "cart/clearcart",
  async () => {
    try {
      const response = await fetch(
        `https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/cart/deleteAll/`,
        {
          method: "POST",
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
      return await response.json();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }
);

// Slice to manage cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // fetchItem: (state, action) => {
    //   console.log(action.payload);

    //   state.productItem = action.payload;
    // },

    allProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(removeCartItemThunk.fulfilled, (state, action) => {
      toast.success("Item Removed from the cart");
    });

    builder.addCase(addOrderThunk.fulfilled, (state, action) => {
      toast.success("Order added successfully!");
    });

    builder.addCase(clearUserCartThunk.fulfilled, (state, action) => {
      toast.success("cart is cleared");
    });

    builder.addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

// Export the actions and reducer

export const cartReducer = cartSlice.reducer;
export const { fetchItem, allProducts } = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer.cartItems;
export const orderSelector = (state) => state.cartReducer.orders;
export const categorySelector = (state) => state.cartReducer.category;
export const productsSelector = (state) => state.cartReducer.products;
