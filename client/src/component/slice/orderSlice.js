import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const orderPlaceApi = createAsyncThunk(
  "order/orderPlaceApi",
  async (
    {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemsPrice,
      shippingPrice,
      totalPrice,
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log(userInfo, getState(), "getUser profile");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/order`,
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          taxPrice,
          itemsPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );
      //   dispatch(authUser({email,password}))
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  extraReducers: {
    [orderPlaceApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [orderPlaceApi.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [orderPlaceApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
