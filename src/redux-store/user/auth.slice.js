import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  authinticateUser,
  registerUser,
  getConfirmCodeFunc,
  checkConfirmCodeFunc,
} from "api/requests";
import { makeArrayWithTrimmedString } from "constants/helpers";

const initialState = {
  isLoading: false,
  isAuthRegLoading: false,
  token: null,
  isAdmin: false,
  status: 1,
  isAuth: false,
  regErrors: [],
  isPhoneCodeLoading: false,
  isPhoneAuthLoading: false,
  phoneNumber: "",
  confirmMsg: "",
  phone: "",
  sessionExpireDate: undefined,
  sessionStartedAt: undefined,
};

export const registerAction = createAsyncThunk(
  "auth/makeRegisterReqAsync",
  registerUser
);

export const loginUserAction = createAsyncThunk(
  "auth/makeAuthLoginReqAsync",
  authinticateUser
);

export const getConfirmCode = createAsyncThunk(
  "auth/getPhoneAuthCode",
  getConfirmCodeFunc
);

export const checkConfirmCode = createAsyncThunk(
  "auth/checkPhoneAuthCode",
  checkConfirmCodeFunc
);

export const phoneAuthWithCode = createAsyncThunk(
  "auth/authinticatePhoneCode",
  authinticateUser
);

export const userAuthReducer = createSlice({
  name: "auth/makeAuthrequest",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    exitUser(state) {
      state.isLoading = false;
      state.token = null;
      state.isAdmin = false;
      state.status = 1;
      state.isAuth = false;
      state.sessionExpireDate = null;
      state.sessionStartedAt = null;
    },
    setPhoneNumber(state, { payload }) {
      state.phoneNumber = payload;
    },
  },
  extraReducers: {
    [registerAction.pending]: (state) => {
      state.isAuthRegLoading = true;
      state.isAuth = false;
    },
    [registerAction.fulfilled]: (state, { payload }) => {
      state.isAuthRegLoading = false;
      if (payload.status == 400) {
        state.regErrors = makeArrayWithTrimmedString(payload?.data?.message);
      } else {
        state.regErrors = [];
        state.token = payload.token;
        state.isAdmin = payload.isAdmin;
        state.status = payload.status;
        state.isAuth = true;
      }
    },
    [registerAction.rejected]: (state, { payload }) => {
      state.isAuthRegLoading = false;
      state.isAuth = false;
    },
    [loginUserAction.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [loginUserAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.status == 401) {
        state.regErrors = makeArrayWithTrimmedString(payload?.data?.message);
      } else {
        state.regErrors = [];
        state.token = payload.token;
        state.isAdmin = payload.isAdmin;
        state.status = payload.status;
        state.isAuth = true;
      }
    },
    [phoneAuthWithCode.pending]: (state) => {
      state.isPhoneAuthLoading = true;
      state.isAuth = false;
    },
    [phoneAuthWithCode.fulfilled]: (state, { payload }) => {
      state.isPhoneAuthLoading = false;
      if (payload.status == 401) {
        state.regErrors = makeArrayWithTrimmedString(payload?.data?.message);
      } else {
        state.regErrors = [];
        state.token = payload.token;
        state.isAdmin = payload.isAdmin;
        state.status = payload.status;
        state.isAuth = true;
      }
    },
    [phoneAuthWithCode.rejected]: (state) => {
      state.isPhoneAuthLoading = false;
    },
    [getConfirmCode.pending]: (state) => {
      state.isPhoneCodeLoading = true;
    },
    [getConfirmCode.fulfilled]: (state, { payload }) => {
      state.isPhoneCodeLoading = false;
      state.confirmMsg = payload?.message;
      state.phone = payload?.phone;
    },
    [getConfirmCode.rejected]: (state) => {
      state.isPhoneCodeLoading = false;
    },
    [checkConfirmCode.pending]: (state) => {
      state.isPhoneCodeLoading = true;
    },
    [checkConfirmCode.fulfilled]: (state, { payload }) => {
      state.isPhoneCodeLoading = false;
      state.confirmMsg = payload;
      state.token = payload.token?.token;
      state.sessionExpireDate = payload.token?.expiresAt;
      state.sessionStartedAt = new Date();
      state.isAdmin = payload.isAdmin;
      state.isAuth = true;
      state.status = payload.status;
    },
    [checkConfirmCode.rejected]: (state) => {
      state.isPhoneCodeLoading = false;
    },
  },
});

export const { exitUser, setToken } = userAuthReducer.actions;

export default userAuthReducer.reducer;
