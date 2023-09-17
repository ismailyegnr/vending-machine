import { configureStore } from "@reduxjs/toolkit";

import machineReducer from "./machineSlice";

export default configureStore({
  reducer: {
    machine: machineReducer,
  },
});
