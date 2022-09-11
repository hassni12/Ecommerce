import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const orderDetailApi = createAsyncThunk(
  "order/orderDetailApi",
  async ( userId, { rejectWithValue, dispatch, getState }) => {
    console.log(userId,"id ")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
    console.log(
      userInfo,
      getState().loginUser.userInfo.accessToken,
      "getUser profile"
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/order/${userId}`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// const orderFromLocalStorage = localStorage.getItem("order")
//   ? JSON.parse(localStorage.getItem("order"))
//   : {};
const orderDetailSlice = createSlice({
  name: "order",
  initialState: {
    orderItem: [],
    shippingAddress: {},
    order:{},
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  extraReducers: {
    [orderDetailApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    },
    [orderDetailApi.fulfilled]: (state, action) => {
      state.order = action.payload;
      // localStorage.setItem("order", JSON.stringify(state.order));
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = null;
    },
    [orderDetailApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess =false;
      state.isError = action.payload.message;
    },
  },
});

export default orderDetailSlice.reducer;
