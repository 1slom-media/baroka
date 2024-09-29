import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfile, getUserProfile } from "api/requests";

const initialState = {
  data: {},
  token: null,
  statistics: {},
  isLoading: false,
  isEditLoading: false
};

export const getUser = createAsyncThunk(
  "user/getUserDataAsync",
  getUserProfile
);

export const editUser = createAsyncThunk(
  "user/editUserDataAsync",
  editUserProfile
);

export const userProfileReducer = createSlice({
  name: "user/getUserData",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      if (!payload) {
        state.data = {};
        state.token = null;
      } else {
        state.user = payload;
      }
    },
    setTokenUser(state, { payload }) {
      state.token = payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
      state.token = payload.token;
    },
    [getUser.rejected]: (state) => {
      state.isLoading = false;
    },
    // edit user data here
    [editUser.pending]: (state) => {
      state.isEditLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isEditLoading = false;
      state.data.user = payload.user;
      state.token = payload.token;
    },
    [editUser.rejected]: (state) => {
      state.isEditLoading = false;
    },
  },
});

export const { setUserData, setTokenUser } = userProfileReducer.actions;

export default userProfileReducer.reducer;
