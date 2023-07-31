import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantInfo: {},
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    addToRestaurantt: (state, action) => {
      state.restaurantInfo = { ...action.payload };
    },
    emptyRestaurant: (state) => {
      state.restaurantInfo = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToRestaurantt, emptyRestaurant } = restaurantSlice.actions;
export const getRestaurantInfo = (state) => state.restaurant.restaurantInfo;

export default restaurantSlice.reducer;