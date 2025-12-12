import { configureStore } from "@reduxjs/toolkit";
import DeviceReducer from "./deviceSlice";

export const store = configureStore({
  reducer: {
    devices: DeviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
