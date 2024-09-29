import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
};

export const getAllCategoryAction = createAsyncThunk(
  "category/getAllCategory",
  getAllCategories
);

export const getAllCategorySlice = createSlice({
  name: "getAllCategory",
  initialState,
  extraReducers: {
    [getAllCategoryAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategoryAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [getAllCategoryAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getAllCategorySlice.reducer;
