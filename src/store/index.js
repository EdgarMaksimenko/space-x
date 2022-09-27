import {configureStore} from "@reduxjs/toolkit";
import rocketItemSlice from "./slices/rocketItemSlice";
import rocketSlice from "./slices/rocketSlice";
import userProfileSlice from "./slices/userProfileSlice";
import popUpSlice from "./slices/popUpSlice";

const store = configureStore({
  reducer: {
    rocket: rocketSlice,
    rocketItem: rocketItemSlice,
    userData: userProfileSlice,
    popUp: popUpSlice,
  }
})

export default store;