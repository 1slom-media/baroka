import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: undefined,
};

export const adminSlice = createSlice({
  name: "order/data-slice",
  initialState,
  reducers: {
    setOrder(state, { payload }) {
      state.order = payload;
    },
  },
});

export const { setOrder } = adminSlice.actions;

export default adminSlice.reducer;
