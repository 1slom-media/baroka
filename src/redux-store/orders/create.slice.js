import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
};

export const createUserOrderAction = createAsyncThunk(
  "user/createUserOrdersAsync",
  createOrder
);

export const createUserOrderSlice = createSlice({
  name: "orderCreate",
  initialState,
  extraReducers: {
    [createUserOrderAction.pending]: (state) => {
      state.isLoading = true;
    },
    [createUserOrderAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [createUserOrderAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default createUserOrderSlice.reducer;
