import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const dragonsUrl = 'https://api.spacexdata.com/v4/dragons';
 

const initialState = {
  rocketsDataItem: [],
  isLoading: true,
};

export const getRocketsDataItem = createAsyncThunk('rocketUtem/getRocketsDataItem', (itemId) => {
  return fetch(dragonsUrl + '/' + itemId)
        .then(res => res.json())
        .catch(err => console.warn(err));
});

const rocketItemSlice = createSlice({
  name: 'rocketItem',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getRocketsDataItem.pending]:(state) => {
      state.isLoading = true;
    },
    [getRocketsDataItem.fulfilled]:(state, action) => {
      state.rocketsDataItem = action.payload;
      state.isLoading = false;
    },
    [getRocketsDataItem.rejected]:(state) => {
      console.warn('REJECTED');
    },
  }
});

export default rocketItemSlice.reducer;

// name: state.rocketData.name,
//         description: state.rocketData.description,
//         first_flight: state.rocketData.first_flight,
//         dry_mass_kg: state.rocketData.dry_mass_kg,
//         dry_mass_lb: state.rocketData.dry_mass_lb,
//         diameter_meters: state.rocketData.diameter.meters,
//         diameter_feet: state.rocketData.diameter.feet,
//         height_w_trunk_meters: state.rocketData.height_w_trunk.meters,
//         height_w_trunk_feet: state.rocketData.height_w_trunk.feet,
//         wiki: state.rocketData.wikipedia,