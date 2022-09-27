import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  message: 'You registered successfuly',
};


const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.isActive = true;
      state.message = action.payload;
    },
    closePopUp: (state) => {
      state.isActive = false;
      state.message = '';
    },
  },
});

export const { showMessage, closePopUp } = popUpSlice.actions;
export default popUpSlice.reducer;