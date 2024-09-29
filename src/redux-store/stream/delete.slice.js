import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteStream } from "api/requests";

const initialState = {
  data: {},
  isLoading: null,
  success: false,
};

export const deleteUserStreams = createAsyncThunk(
  "streams/deleteUserStreamsAsync",
  deleteStream
);

export const deleteUserStreamsReducer = createSlice({
  name: "streams/deleteUserStreams",
  initialState,
  extraReducers: {
    [deleteUserStreams.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserStreams.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [deleteUserStreams.rejected]: (state) => {
      state.isLoading = false;
      state.success = false;
    },
  },
});

export default deleteUserStreamsReducer.reducer;
