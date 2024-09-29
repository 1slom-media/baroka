import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchProduct } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
  isOpen: false,
};

export const searchProductAction = createAsyncThunk(
  "products/searchProduct",
  searchProduct
);

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState,
  extraReducers: {
    [searchProductAction.pending]: (state) => {
      state.isLoading = true;
      state.isOpen = true;
    },
    [searchProductAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isOpen = true;
      state.list = payload;
    },
    [searchProductAction.rejected]: (state) => {
      state.isLoading = false;
      state.isOpen = false;
    },
  },
});

export default searchProductSlice.reducer;
