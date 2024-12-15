import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Config/firebasedb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
const INITIAL_STATE = {
  isLoggedIn: true,
  signIn: null,
  signOut: null,
};

// define and export signIn async thunk below
export const signInThunk = createAsyncThunk(
  "users/signIn",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("this is sign in thunk");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Return the userCredential object or just the user object
      return userCredential;
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
    return signOut(auth);
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
      state.signIn = action.payload.user.uid;
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
