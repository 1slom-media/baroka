import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStream } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
  isOpen: false,
};

export const createUserStreams = createAsyncThunk(
  "streams/createUserStreamsAsync",
  createStream
);

export const createUserStreamsReducer = createSlice({
  name: "streams/createUserStreams",
  initialState,
  reducers: {
    setClose(state) {
      state.isOpen = false;
      state.data = {};
      state.isLoading = false;
    },
  },
  extraReducers: {
    [createUserStreams.pending]: (state) => {
      state.isLoading = true;
    },
    [createUserStreams.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.isOpen = true;
    },
    [createUserStreams.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setClose } = createUserStreamsReducer.actions;

export default createUserStreamsReducer.reducer;
