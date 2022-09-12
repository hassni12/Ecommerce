import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const myOrderDetailsApi = createAsyncThunk(
  "myOrder/myOrderDetailsApi",
  async (rejectWithValue) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/order/myorders`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const myOrderSlice = createSlice({
  name: "myOrder",
  initialState: {
    order:[],
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
reducers:{
    refreshUserOrder:(state, action)=>{
        state.order = []
    }
},
  extraReducers: {
    [myOrderDetailsApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    },
    [myOrderDetailsApi.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = null;
    },
    [myOrderDetailsApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess =false;
      state.isError = action.payload.message;
    },
  },
});
export const {refreshUserOrder}=myOrderSlice.actions
export default myOrderSlice.reducer;
