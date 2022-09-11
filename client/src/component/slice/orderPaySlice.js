import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const orderPayApi = createAsyncThunk(
  "order/orderPayApi",
  async (
    { orderId, paymentResult },
    { rejectWithValue, dispatch, getState }
  ) => {
    console.log(orderId, "id ",paymentResult);
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
      const { data } = await axios.put(
        `http://localhost:8000/api/order/${orderId}/pay`,
        { paymentResult },
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderPaySlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.order = {};
    },
  },
  extraReducers: {
    [orderPayApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    },
    [orderPayApi.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = null;
    },
    [orderPayApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.payload.message;
    },
  },
});
export const {refresh}=orderPaySlice.actions
export default orderPaySlice.reducer;
