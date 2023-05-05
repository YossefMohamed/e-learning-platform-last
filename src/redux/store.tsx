import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlices";
import logger from "redux-logger";
import { operationsSlice } from "./slices/operationSlices";

export const store = configureStore({
  reducer: {
    userState: userSlice.reducer,
    operationsState: operationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  devTools: process.env.NODE_ENV !== "production",
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
