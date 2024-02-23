import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import alertReducer from "./features/alertSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
});
