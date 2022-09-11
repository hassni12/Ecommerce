import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// toast
// useMemo
import axios from "axios";
import { useMemo } from "react";
import { toast } from "react-toastify";
export const addToCartApi = createAsyncThunk(
  "addCart/addToCart",
  async ({ id, qty }, { dispatch, getState, signal }) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/products/${id}`
    );
    return {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };
  }
);

const cartFromLocalStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;
const initialState = {
  cartItem: cartFromLocalStorage,
  shippingAddress: shippingAddressFromLocalStorage,
  paymentMethod: paymentMethodFromLocalStorage,
  isLoading: false,
  isError: null,
};
const addToCartSlice = createSlice({
  name: "addCart",
  initialState,
  reducers: {
    removeCartItem: (state, action) => {
      const filteredCart = state.cartItem.filter(
        (x) => x._id !== action.payload._id
      );
      console.log(filteredCart, "filtering");
      state.cartItem = filteredCart;
      toast.success(`${action.payload.name} Deleted From Cart`);
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    shippingAddressReducer: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
  },
  extraReducers: {
    [addToCartApi.fulfilled]: (state, action) => {
      const item = action.payload;
      console.log(item);
      const existingItem = state.cartItem.find((p) => p._id === item._id);
      // console.log(existingItem,"alredy");
      // eslint-disable-next-line no-lone-blocks
      {
        existingItem
          ? (state.cartItem = state.cartItem.map((p) =>
              p._id === existingItem._id ? item : p
            ))
          : state.cartItem.push(action.payload);
        toast.success(
          `Total ${action.payload.qty} ${action.payload.name} Added To Cart`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },

  [addToCartApi.rejected]: (state, action) => {
    state.isError = action.payload;
    state.isLoading = false;
  },
});
export const { removeCartItem, shippingAddressReducer ,savePaymentMethod} =
  addToCartSlice.actions;
export default addToCartSlice.reducer;
