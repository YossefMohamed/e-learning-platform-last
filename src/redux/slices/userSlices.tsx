import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
  user: {
    isAdmin: boolean;
    _id?: string;
    id?: string;
    name?: string;
    phoneNumber?: string;
    course?: any;
    year?: any;
  };
} = {
  isAuthenticated: false,
  loading: true,
  token: "",
  user: {
    isAdmin: false,
  },
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
      state.user = action.payload.user
        ? action.payload.user
        : {
            isAdmin: false,
          };
    },
    loading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.token = "";
      localStorage.removeItem("token");
      state.user = {
        isAdmin: false,
      };
    },
  },
});

export const { addUser, loading, logout, stopLoading } = userSlice.actions;
