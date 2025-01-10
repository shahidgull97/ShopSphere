import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Config/firebasedb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
const INITIAL_STATE = {
  isLoggedIn: true,
  signInToken: null,
  signOut: null,
};

// define and export signIn async thunk below
export const signInThunk = createAsyncThunk(
  "users/signIn",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log("this is sign in thunk");

      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   formData.email,
      //   formData.password
      // );
      // const user = userCredential.user;
      const user = await fetch(
        "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        }
      );
      if (!user.ok) {
        // Extract error message from backend
        const errorData = await user.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Return the userCredential object or just the user object
      return await user.json();
    } catch (error) {
      // Handle error
      toast.error(error.message);
      console.error("Error signing in:", error.message);

      // Return a rejection value to handle the error in your slice
      return rejectWithValue(error.message);
    }
  }
);

export const signOutThunk = createAsyncThunk("users/signOut", async () => {
  try {
    // return signOut(auth);
    const logout = await fetch(
      "https://shopsphere-backend-z0dv.onrender.com/api/shopsphere/user/logout",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      }
    );
  } catch (error) {
    toast.error(error.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    toggelLogin: (state, action) => {
      console.log(action.payload);

      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      console.log(action.payload.token);

      state.signInToken = action.payload.token;
      state.isLoggedIn = true;
      toast.success("SignIn Successful");
    });
    builder.addCase(signOutThunk.fulfilled, (state, action) => {
      state.signOut = null;
      state.isLoggedIn = false;
      toast.success("User Signout Successfull");
    });
  },
});

export const userReducer = userSlice.reducer;
export const { signIn, logOut, toggelLogin } = userSlice.actions;

export const userSelector = (state) => state.userReducer;
export const tokenSelector = (state) => state.userReducer.signInToken;
