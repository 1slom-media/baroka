import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserStatistics,
  getSoldProductsMost,
  getSellersTop,
  getMarketingOrders,
} from "api/requests";

const initialState = {
  list: [],
  limit: 10,
  products: [],
  sellers: [],
  isSellersLoading: false,
  isProductsLoading: [],
  details: null,
  isLoading: false,
  countPage: 0,
  orders: [],
  orderPagesCount: 0,
  ordersLimit: 12,
  isOrdersLoading: false,
};

export const getAdminOrders = createAsyncThunk(
  "statistics/getMarketingOrders",
  getMarketingOrders
);

export const getUserStats = createAsyncThunk(
  "statistics/fecthUserStatisticsAsync",
  getUserStatistics
);

export const getMostSoldProducts = createAsyncThunk(
  "statistics/fecthMostSoldProducts",
  getSoldProductsMost
);

export const getTopSellers = createAsyncThunk(
  "statistics/fectTopSellers",
  getSellersTop
);

export const getUserStatsReducer = createSlice({
  name: "statistics/fecthUserStatistics",
  initialState,
  reducers: {
    setLimit(state, { payload }) {
      state.limit = payload;
    },
    setOrdersLimit(state, { payload }) {
      state.ordersLimit = payload;
    },
  },
  extraReducers: {
    [getUserStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.details = payload.streamDetails;
      state.list = payload.streams;
      state.countPage = payload.countPage;
    },
    [getUserStats.rejected]: (state) => {
      state.isLoading = false;
    },
    //getMostSoldProducts
    [getMostSoldProducts.pending]: (state) => {
      state.isProductsLoading = true;
    },
    [getMostSoldProducts.fulfilled]: (state, { payload }) => {
      state.isProductsLoading = false;
      state.products = payload;
    },
    [getMostSoldProducts.rejected]: (state) => {
      state.isProductsLoading = false;
    },
    //getTopSellers
    [getTopSellers.pending]: (state) => {
      state.isSellersLoading = true;
    },
    [getTopSellers.fulfilled]: (state, { payload }) => {
      state.isSellersLoading = false;
      state.sellers = payload?.besSellers;
    },
    [getTopSellers.rejected]: (state) => {
      state.isSellersLoading = false;
    },
    //getAdminOrders
    [getAdminOrders.pending]: (state) => {
      state.isOrdersLoading = true;
    },
    [getAdminOrders.fulfilled]: (state, { payload }) => {
      state.isOrdersLoading = false;
      state.orders = payload?.orders;
      state.orderPagesCount = payload?.countPage;
    },
    [getAdminOrders.rejected]: (state) => {
      state.isOrdersLoading = false;
    },
  },
});

export const { setLimit, setOrdersLimit } = getUserStatsReducer.actions;

export default getUserStatsReducer.reducer;
