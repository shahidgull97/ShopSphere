import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../Config/firebasedb";
import { toast } from "react-toastify";
// Initial state using the adapter
const initialState = {
  cartItems: [],
  loading: false,
  orders: {},
  totalAmount: 0,
  searchInput: "",
  productItem: null,
};

// This is to calculate the current data and time
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
// Async thunk to fetch cart items from Firestore
export const fetchCartItemsThunk = createAsyncThunk(
  "cart/fetchCartItems",

  async (_, thunkAPI) => {
    try {
      const userId = auth.currentUser.uid; // Get the logged-in user's ID
      console.log(userId);

      const cartQuery = query(
        collection(db, "Cart"),
        where("userId", "==", userId) // Filter by userId
      );

      const unsubscribe = onSnapshot(cartQuery, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(),
        }));
        // setCartItems(items);
        thunkAPI.dispatch(fetchCartItemsAction(items));
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
);

// / Async thunk to add or update a cart item in Firestore
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (Item, { getState }) => {
    const userId = auth.currentUser.uid; // Get current user ID
    const Id = Item.data.id;
    const state = getState(); // Get the current Redux state
    const newCart = state.cartReducer.cartItems;
    const existingItem = newCart.find((cart) => cart.data.id === Id);
    console.log(existingItem);

    try {
      if (existingItem) {
        // Update the quantity if the item exists
        const itemRef = doc(db, "Cart", existingItem.id);
        await updateDoc(itemRef, {
          Qnt: existingItem.Qnt + 1,
        });
        return itemRef;
      } else {
        // Add a new item if it doesn't exist
        const newItem = {
          userId,
          data: Item.data,
          Qnt: 1,
          createdAt: new Date(),
        };
        const addItem = await addDoc(collection(db, "Cart"), newItem);

        return addItem;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }
);
// Remove cart Item
export const removeCartItemThunk = createAsyncThunk(
  "cart/removeItem",
  async (Item, { getState }) => {
    const cartItemId = Item.id;
    const Id = Item.data.id;
    console.log("remove item");

    const state = getState(); // Get the current Redux state

    const newCart = state.cartReducer.cartItems;
    const newItem = newCart.find((cart) => cart.data.id === Id);
    if (newItem && newItem.Qnt > 1) {
      try {
        const itemRef = doc(db, "Cart", newItem.id); // Reference to the document
        await updateDoc(itemRef, {
          Qnt: Number(newItem.Qnt) - 1, // Update Qnt with the incremented value
        }); // Update the specified fields
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      try {
        const itemRef = doc(db, "Cart", cartItemId); // Reference to the document
        await deleteDoc(itemRef);
        // toast.success("Item Removed from the cart");
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    }
  }
);

// This is to add orders
export const addOrderThunk = createAsyncThunk(
  "cart/addOrder",
  async (_, { getState }) => {
    try {
      const state = getState(); // Get the current Redux state
      const newCart = state.cartReducer.cartItems;

      const newPrice = state.cartReducer.totalAmount;
      const userId = auth.currentUser.uid; // Get the logged-in user's ID
      return await addDoc(collection(db, "Orders"), {
        userId,
        orderDate: getCurrentDateTime(),
        items: newCart,
        totalAmount: newPrice,
        createdAt: serverTimestamp(),
      });
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
      const userId = auth.currentUser.uid; // Get the logged-in user's ID
      // query to fetch orders baseded on userId and displays them in descending order
      console.log(userId);

      const q = query(
        collection(db, "Orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      const newOrders = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const orderDate = data.orderDate;

        if (!newOrders[orderDate]) {
          newOrders[orderDate] = [];
        }
        newOrders[orderDate].push({
          items: data.items, // Array of items
          totalAmount: data.totalAmount, // Total amount
          orderStatus: "Processing",
          orderId: "ORD" + data.orderDate.replace(/[\/\s:\-]/g, ""),
        });
      });
      return newOrders;
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);

      return null;
    }
  }
);
// clear user Cart (This function clears user cart after an order has been placed)
export const clearUserCartThunk = createAsyncThunk(
  "cart/clearcart",
  async () => {
    try {
      const userId = auth.currentUser.uid;
      // Reference to the "Cart" collection
      const cartRef = collection(db, "Cart");

      // Query to find all items for the specific user
      const q = query(cartRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      // Delete each document
      const batchPromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      return await Promise.all(batchPromises);
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
    fetchCartItemsAction: (state, action) => {
      state.cartItems = action.payload;
      console.log(state.cartItems);

      state.totalAmount = action.payload.reduce(
        (acc, val) => acc + val.data.price * val.Qnt,
        0
      );
    },
    searchQuery: (state, action) => {
      state.searchInput = action.payload;
    },

    fetchItem: (state, action) => {
      console.log(action.payload);

      state.productItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      toast.success("Item added to cart");
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
export const { fetchCartItemsAction, searchQuery, setCatagory, fetchItem } =
  cartSlice.actions;

export const cartSelector = (state) => state.cartReducer.cartItems;
export const orderSelector = (state) => state.cartReducer.orders;
export const totalPriceSelector = (state) => state.cartReducer.totalAmount;
export const categorySelector = (state) => state.cartReducer.category;
export const searchSelector = (state) => state.cartReducer.searchInput;
export const itemSelector = (state) => state.cartReducer.productItem;
