import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  customers: [],
  orders: [],
  operators: [],
  filteredByStatus: [],
  payments: [],
};

export const adminSlice = createSlice({
  name: "admin/data-slice",
  initialState,
  reducers: {
    setProducts(state, { payload }) {
      state.products = payload;
    },
    setCustomers(state, { payload }) {
      state.customers = payload;
    },
    setOrders(state, { payload }) {
      state.orders = payload;
    },
    setOperators(state, { payload }) {
      state.operators = payload;
    },
    setFilteredOrders(state, { payload }) {
      state.filteredByStatus = payload;
    },
    setAdminAllPayments(state, { payload }) {
      state.payments = payload;
    },
  },
});

export const {
  setProducts,
  setCustomers,
  setOrders,
  setOperators,
  setFilteredOrders,
  setAdminAllPayments,
} = adminSlice.actions;

export default adminSlice.reducer;
