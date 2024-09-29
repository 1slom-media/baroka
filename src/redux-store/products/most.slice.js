import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMostSoldProducts } from "api/requests";

const initialState = {
  list: [],
  pageCount: 1,
  isLoading: false,
};

export const getSoldProducts = createAsyncThunk(
  "products/mostSoldProducts",
  getMostSoldProducts
);

export const getMostSoldReducer = createSlice({
  name: "products/mostSoldProducts",
  initialState,
  extraReducers: {
    [getSoldProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getSoldProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.products;
      state.pageCount = payload?.countPage;
    },
    [getSoldProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getMostSoldReducer.reducer;