import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserPayment } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
};

export const addUserPaymentAction = createAsyncThunk(
  "payment/addUserPaymentActionAsync",
  addUserPayment
);

export const addUserPaymentSlice = createSlice({
  name: "payment/addUserPaymentSlice",
  initialState,
  extraReducers: {
    [addUserPaymentAction.pending]: (state) => {
      state.isLoading = true;
    },
    [addUserPaymentAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload;
    },
    [addUserPaymentAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default addUserPaymentSlice.reducer;
