import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  requests: [],
};

export const notifySlice = createSlice({
  name: "notifications/readSlice",
  initialState,
  reducers: {
    setOrdersNotify(state, { payload }) {
      state.orders = payload;
    },
    setRequestsNotify(state, { payload }) {
      state.requests = payload;
    },
  },
});

export const { setOrdersNotify, setRequestsNotify } = notifySlice.actions;

export default notifySlice.reducer;
