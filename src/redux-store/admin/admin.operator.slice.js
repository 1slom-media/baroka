import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOperatorData } from "api/requests";

const initialState = {
  data: undefined,
  isLoading: false,
  isErorr: false,
};

export const getAdminOperator = createAsyncThunk(
  "admin/fecthOperatorStatistics",
  async (payload) => await getOperatorData(payload.userId, payload.token)
);

export const adminOperatorSlice = createSlice({
  name: "admin/OperatorData",
  initialState,
  reducers: {
    setOrder(state, { payload }) {
      state.order = payload;
    },
  },
  extraReducers: {
    [getAdminOperator.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdminOperator.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.user;
    },
    [getAdminOperator.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setOrder } = adminOperatorSlice.actions;

export default adminOperatorSlice.reducer;
