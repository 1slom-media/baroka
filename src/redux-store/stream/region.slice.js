import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateStreamRegionAsync } from "api/requests";

const initialState = {
  isLoading: false,
  selectedId: null,
};

export const updateStreamRegion = createAsyncThunk(
  "streams/updateStreamregion",
  updateStreamRegionAsync
);

export const streamRegionReducer = createSlice({
  name: "streams/updateStream",
  initialState,
  extraReducers: {
    [updateStreamRegion.pending]: (state, payload) => {
      state.isLoading = true;
      state.selectedId = payload?.meta.arg.id;
    },
    [updateStreamRegion.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [updateStreamRegion.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default streamRegionReducer.reducer;
