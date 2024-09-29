import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStreamDetails } from "api/requests";

const initialState = {
  orders: [],
  pageCount: 0,
  stream: {},
  isLoading: false,
};

export const streamDetailAction = createAsyncThunk(
  "stream/details",
  getStreamDetails
);

export const streamDetailsSlice = createSlice({
  name: "streamDetails",
  initialState,
  extraReducers: {
    [streamDetailAction.pending]: (state) => {
      state.isLoading = true;
    },
    [streamDetailAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.pageCount = payload?.orders?.countPage;
      state.orders = payload?.orders?.orders;
      state.stream = payload?.stream;
    },
    [streamDetailAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default streamDetailsSlice.reducer;
