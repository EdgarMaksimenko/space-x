import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    uid: '',
    favourites: [],
    email: '',
  },
  userActive: false,
};


const userProfileSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      state.userData.uid = action.payload.uid.stringValue;
      state.userData.email = action.payload.email.stringValue;
      state.userActive = true;
    },
    unInitializeUser: (state) => {
      state.userData.uid = '';
      state.userData.favourites = [];
      state.userData.email = '';
      state.userActive = false;
    },
    addFavourite: (state, action) => {
      state.userData.favourites = [...state.userData.favourites, action.payload];
    },
    removeFavourite: (state, action) => {
      state.userData.favourites = state.userData.favourites.filter(item => item.id !== action.payload);
    },
  },
});

export const { initializeUser, unInitializeUser, addFavourite, removeFavourite } = userProfileSlice.actions;
export default userProfileSlice.reducer;