import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const dragonsUrl = 'https://api.spacexdata.com/v4/dragons';
 

const initialState = {
  rocketsData: [],
  isLoading: true,
};

export const getRocketsData = createAsyncThunk('rocket/getRocketsData', () => {
  return fetch(dragonsUrl)
        .then(res => res.json())
        .catch(err => console.warn(err));
});

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getRocketsData.pending]:(state) => {
      state.isLoading = true;
    },
    [getRocketsData.fulfilled]:(state, action) => {
      state.rocketsData = action.payload;
      state.isLoading = false;

      localStorage.clear();
      const cashedData = state.rocketsData.map(el => {
        return {
          id: el.id,
          images: el.flickr_images,
          name: el.name,
        } 
      });
      localStorage.setItem('rocketsData', JSON.stringify(cashedData));
    },
    [getRocketsData.rejected]:(state) => {
      console.warn('REJECTED');
    },
  }
});

export default rocketSlice.reducer;