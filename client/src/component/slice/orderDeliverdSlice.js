import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const orderDeliverApi = createAsyncThunk(
  "orderDeliver/orderDeliverApi",
  async (
    orderId,
    rejectWithValue
  ) => {
    console.log(orderId, "id  delivered");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/order/${orderId}/deliver`,
        {},
        config
      );
      console.log(data, "orderDeliverApi");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {
    orderDeliver: {},
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  reducers: {
    refreshDeliver: (state, action) => {
      state.orderDeliver = {};
    },
  },
  extraReducers: {
    [orderDeliverApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    },
    [orderDeliverApi.fulfilled]: (state, action) => {
      state.orderDeliver = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = null;
    },
    [orderDeliverApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.payload.message;
    },
  },
});
export const {refreshDeliver}=orderDeliverSlice.actions
export default orderDeliverSlice.reducer;
