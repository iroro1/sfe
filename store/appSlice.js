import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    storeAppData: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeAppData } = appSlice.actions;

export default appSlice.reducer;
