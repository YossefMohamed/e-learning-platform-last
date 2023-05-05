import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
} = {
  isAuthenticated: false,
  loading: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loading: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {};
    },
  },
});

export const { addUser, loading, logout } = userSlice.actions;
