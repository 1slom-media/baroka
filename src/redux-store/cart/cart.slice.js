import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  data: [],
  order: [],
  quantity: 0,
};

export const cartReducer = createSlice({
  name: "cart/cartActions",
  initialState,
  reducers: {
    addTobasket: (state, { payload }) => {
      const data = [...state.data];
      const findIfExist = data.find((item) => item._id === payload._id);
      const filteredData = data.filter((item) => item._id !== payload._id);
      if (findIfExist) {
        state.data = [
          ...filteredData,
          {
            ...findIfExist,
            quantity: findIfExist.quantity + 1,
          },
        ];
        state.totalPrice += payload.price;
        state.quantity += 1;
      } else {
        state.data.push({ ...payload, quantity: 1 });
        state.quantity += 1;
        state.totalPrice += payload.price;
      }
    },
    removeFromOrders: (state) => {
      state.order = [];
    },
    removeFromBasket: (state, { payload }) => {
      const data = [...state.data];
      const findTheItem = data.find((item) => item._id === payload);
      const filterTheCart = data.filter((item) => item._id !== payload);
      state.data = filterTheCart;
      state.quantity -= findTheItem.quantity;
      state.totalPrice -= findTheItem.price * findTheItem.quantity;
    },
    increaseQuantity: (state, { payload }) => {
      const data = [...state.data];
      const findTheItem = data.find((item) => item._id === payload);
      const findTheIndex = data.findIndex((item) => item._id === payload);
      if (findTheItem) {
        state.data[findTheIndex].quantity += 1;
        state.quantity += 1;
        state.totalPrice += findTheItem.price;
      }
    },
    decreaseQuantity: (state, { payload }) => {
      const data = [...state.data];
      const findTheItem = data.find((item) => item._id === payload);
      const findTheIndex = data.findIndex((item) => item._id === payload);
      if (findTheItem && findTheItem.quantity > 1) {
        state.data[findTheIndex].quantity -= 1;
        state.quantity -= 1;
        state.totalPrice -= findTheItem.price;
      }
    },
    emptyBasket: (state, { payload }) => {
      state.data = payload;
      state.quantity = 0;
    },
  },
});

export const {
  addTobasket,
  removeFromBasket,
  decreaseQuantity,
  increaseQuantity,
  emptyBasket,
  removeFromOrders,
} = cartReducer.actions;

export default cartReducer.reducer;
