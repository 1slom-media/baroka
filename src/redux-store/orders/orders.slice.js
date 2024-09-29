import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserOrders } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
};

export const userOrdersAction = createAsyncThunk(
  "user/getUserOrdersAsync",
  getUserOrders
);

export const getUserOrdersSlice = createSlice({
  name: "userorders",
  initialState,
  extraReducers: {
    [userOrdersAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userOrdersAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [userOrdersAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getUserOrdersSlice.reducer;
