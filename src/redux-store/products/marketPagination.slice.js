import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMarketAll } from "api/requests";

const initialState = {
  list: [],
  pageCount: 1,
  isLoading: false,
};

export const getMarketPagination = createAsyncThunk(
  "market/fecthMarketPagination",
  getMarketAll
);

export const marketByDataPagination = createSlice({
  name: "market/getByPagination",
  initialState,
  extraReducers: {
    [getMarketPagination.pending]: (state) => {
      state.isLoading = true;
    },
    [getMarketPagination.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.products;
      state.pageCount = payload?.countPage;
    },
    [getMarketPagination.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default marketByDataPagination.reducer;
