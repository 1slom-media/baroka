import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUserStreams } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
  limit: 10,
};

export const getUserStreams = createAsyncThunk(
  "streams/fecthUserStreamsAsync",
  getAllUserStreams
);

export const getUserStreamsReducer = createSlice({
  name: "streams/fecthUserStreams",
  initialState,
  reducers: {
    setLimit(state, { payload }) {
      state.limit = payload;
    },
  },
  extraReducers: {
    [getUserStreams.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserStreams.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [getUserStreams.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLimit } = getUserStreamsReducer.actions;

export default getUserStreamsReducer.reducer;
