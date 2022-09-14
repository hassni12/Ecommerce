import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const adminGetUsersOrderApi = createAsyncThunk(
  "userOrder/adminGetUsersOrderApi",
  async (rejectWithValue) => {
   const userInfo= JSON.parse(localStorage.getItem('userInfo'));

    // console.log(userInfo,getState(),"getUser profile");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/order`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminGetUsersOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    userOrder: [],
    isLoading: false,
    isError: null,
  },
  reducers:{
    refreshAdminGetUser: (state, action) => {
      state.userOrder=[]
    }
  },
  
  extraReducers: {
    [adminGetUsersOrderApi.pending]: (state, action) => {
      state.isLoading=true;
      state.isError=null;
    },
    [adminGetUsersOrderApi.fulfilled]: (state, action) => {
      state. userOrder= action.payload;
      state.isLoading = false;
    },
    [adminGetUsersOrderApi.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      state.isError = action.payload.message;
    },
  },
});
// export const {refreshAdminGetUser}=adminGetUsersSlice.actions 

export default adminGetUsersOrderSlice.reducer;