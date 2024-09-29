import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserRequestsAsync } from "api/requests";

const initialState = {
  list: [],
  limit: 10,
  isLoading: false,
  pageCount: 0,
};

export const getUserRequests = createAsyncThunk(
  "requests/fecthUserRequestsAsync",
  getUserRequestsAsync
);

export const getUserRequestsReducer = createSlice({
  name: "requests/fecthUserRequests",
  initialState,
  reducers: {
    setLimit(state, { payload }) {
      state.limit = payload;
    },
  },
  extraReducers: {
    [getUserRequests.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserRequests.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.requests;
      state.pageCount = payload.pageCount;
    },
    [getUserRequests.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLimit } = getUserRequestsReducer.actions;

export default getUserRequestsReducer.reducer;
