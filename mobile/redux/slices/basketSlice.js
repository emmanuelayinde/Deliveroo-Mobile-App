import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      let newBasketItems = [...state.items];
      if (index >= 0) {
        newBasketItems.splice(index, 1);
      } else {
        console.warn("Error removing items from basket");
      }
      state.items = newBasketItems;
    },
    removeDishFromBasket: (state, action) => {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id,
      );
      state.items = [...newItems];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, removeDishFromBasket } =
  basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export const selectOneBasketItem = (state, id) => {
  if (state.basket.items)
    return state.basket.items.filter((item) => item.id === id);
  else return [];
};
export const basketItemsTotalAmount = (state) => {
  return state.basket.items.reduce((total, item) => total + item.price, 0);
};

export default basketSlice.reducer;
