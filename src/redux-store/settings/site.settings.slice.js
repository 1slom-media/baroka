import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSiteSettingsInfo,
  getBotSettingsInfo,
  updateBotSettingsInfo,
} from "api/requests";

const initialState = {
  site: {},
  bot: null,
  isLoading: false,
  isBotGetLoading: false,
  isBotUpdateLoading: false,
};

export const getSiteSettings = createAsyncThunk(
  "settings/getSiteSettingsInfo",
  getSiteSettingsInfo
);

export const getBotSettings = createAsyncThunk(
  "settings/getBotSettingsInfo",
  getBotSettingsInfo
);

export const updateBotSettings = createAsyncThunk(
  "settings/updateBotSettingsInfo",
  updateBotSettingsInfo
);

export const siteSettingsReducer = createSlice({
  name: "slice/settings",
  initialState,
  extraReducers: {
    [getSiteSettings.pending]: (state) => {
      state.isLoading = true;
    },
    [getSiteSettings.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.site = payload[0];
    },
    [getSiteSettings.rejected]: (state) => {
      state.isLoading = false;
    },
    //getBotSettings
    [getBotSettings.pending]: (state) => {
      state.isBotGetLoading = true;
    },
    [getBotSettings.fulfilled]: (state, { payload }) => {
      state.isBotGetLoading = false;
      state.bot = payload;
    },
    [getBotSettings.rejected]: (state) => {
      state.isBotGetLoading = false;
    },
    //updateBotSettings
    [updateBotSettings.pending]: (state) => {
      state.isBotUpdateLoading = true;
    },
    [updateBotSettings.fulfilled]: (state, { payload }) => {
      state.isBotUpdateLoading = false;
    },
    [updateBotSettings.rejected]: (state) => {
      state.isBotUpdateLoading = false;
    },
  },
});

export default siteSettingsReducer.reducer;
