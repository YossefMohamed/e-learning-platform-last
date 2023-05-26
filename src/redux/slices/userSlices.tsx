import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
  user: any;
} = {
  isAuthenticated: false,
  loading: false,
  token: "",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loading: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.token = "";
      state.user = {
        isAdmin: false,
      };
    },
  },
});

export const { addUser, loading, logout } = userSlice.actions;
