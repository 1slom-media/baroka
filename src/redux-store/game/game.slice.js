import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserGame, getUserGameNyId } from "api/requests";

const initialState = {
  data: {},
  isSingleLoading: false,
  list: [],
  isLoading: false,
};

export const getGames = createAsyncThunk(
  "game/fetchGamesListAsync",
  getUserGame
);
export const getSingleGame = createAsyncThunk(
  "game/fetchGameAsync",
  getUserGameNyId
);

export const gameReducer = createSlice({
  name: "game/fetchGame",
  initialState,
  extraReducers: {
    [getGames.pending]: (state) => {
      state.isLoading = true;
    },
    [getGames.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.competitions;
    },
    [getGames.rejected]: (state) => {
      state.isLoading = false;
    },
    //getSingleGame
    [getSingleGame.pending]: (state) => {
      state.isSingleLoading = true;
    },
    [getSingleGame.fulfilled]: (state, { payload }) => {
      state.isSingleLoading = false;
      state.data = payload?.data;
      state.data.success = payload?.success;
    },
    [getSingleGame.rejected]: (state) => {
      state.isSingleLoading = false;
    },
  },
});

export default gameReducer.reducer;
