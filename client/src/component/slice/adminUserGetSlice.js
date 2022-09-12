import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const adminUserGetApi = createAsyncThunk(
  "users/adminUserGetApi",
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
        `http://localhost:8000/api/users/admin`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminGetUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    isError: null,
  },
  
  extraReducers: {
    [adminUserGetApi.pending]: (state, action) => {
      state.isLoading=true;
      state.isError=null;
    },
    [adminUserGetApi.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [adminUserGetApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});
// export const {refreshUserProfile}=getProfileSlice.actions 

export default adminGetUsersSlice.reducer;