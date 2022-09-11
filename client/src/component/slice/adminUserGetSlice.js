import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const adminUserGet = createAsyncThunk(
  "users/adminUserGet",
  async (rejectWithValue) => {
   const userInfo= JSON.parse(localStorage.getItem('userInfo'));

    console.log(userInfo,getState(),"getUser profile");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/admin`,
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

const getProfileSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
    isLoading: false,
    isError: null,
  },
  
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.isLoading=true;
      state.isError=null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});
export const {refreshUserProfile}=getProfileSlice.actions 

export default getProfileSlice.reducer;