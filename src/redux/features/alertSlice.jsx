import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

// alert = { variant: info\success\error\warning, message: "message" }
export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
