import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  id: string;
} = {
  id: "",
};

export const operationsSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { addId } = operationsSlice.actions;
