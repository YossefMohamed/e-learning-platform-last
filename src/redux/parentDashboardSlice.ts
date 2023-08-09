import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParentDashboardState {
  childProgress: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ParentDashboardState = {
  childProgress: [],
  status: 'idle',
  error: null,
};

const parentDashboardSlice = createSlice({
  name: 'parentDashboard',
  initialState,
  reducers: {
    fetchChildProgressStart: (state) => {
      state.status = 'loading';
    },
    fetchChildProgressSuccess: (state, action: PayloadAction<any[]>) => {
      state.status = 'succeeded';
      state.childProgress = action.payload;
    },
    fetchChildProgressFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchChildProgressStart,
  fetchChildProgressSuccess,
  fetchChildProgressFailure,
} = parentDashboardSlice.actions;

export default parentDashboardSlice.reducer;