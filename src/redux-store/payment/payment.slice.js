import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPayments } from "api/requests";

const initialState = {
  history: [],
  isLoading: false,
  limit: 10,
};

export const getUserPaymentsHistory = createAsyncThunk(
  "payment/fetchuserPaymentsAsync",
  getUserPayments
);

export const userPaymentsReducer = createSlice({
  name: "payment/fetchuserPayments",
  initialState,
  reducers: {
    setLimit(state, { payload }) {
      state.limit = payload;
    },
  },
  extraReducers: {
    [getUserPaymentsHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserPaymentsHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload;
    },
    [getUserPaymentsHistory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLimit } = userPaymentsReducer.actions;

export default userPaymentsReducer.reducer;
