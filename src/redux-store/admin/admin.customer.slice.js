import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminData } from "api/requests";

const initialState = {
  data: undefined,
  isLoading: false,
  isErorr: false,
};

export const getAdminCustomer = createAsyncThunk(
  "admin/fecthcustomerStatistics",
  async (payload) => {
    let res = await getAdminData(payload.userId, payload.token);
    return res;
  }
);

export const adminCustomerSlice = createSlice({
  name: "admin/customerData",
  initialState,
  reducers: {
    setOrder(state, { payload }) {
      state.order = payload;
    },
  },
  extraReducers: {
    [getAdminCustomer.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdminCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.user;
    },
    [getAdminCustomer.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setOrder } = adminCustomerSlice.actions;

export default adminCustomerSlice.reducer;
