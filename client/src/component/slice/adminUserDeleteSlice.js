import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const adminUserDeleteApi = createAsyncThunk(
  "users/adminUserDeleteApi",
  async ({id},{rejectWithValue}) => {
    console.log(id,"deleted user id")
   const userInfo= JSON.parse(localStorage.getItem('userInfo'));

    // console.log(userInfo,getState(),"getUser profile");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/users/admin/${id}`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminDeleteUsersSlice = createSlice({
  name: "users",
  initialState: {
    deletedUsers: [],
    isLoading: false,
    isSuccess:false,
    isError: null,
  },
  
  extraReducers: {
    [adminUserDeleteApi.pending]: (state, action) => {
      state.isLoading=true;
      state.isSuccess=false;
      state.isError=null;
    },
    [adminUserDeleteApi.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isSuccess=true;
      state.isLoading = false;
    },
    [adminUserDeleteApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess=false;
      console.log(action.payload)
      state.isError = action.payload.message;
    },
  },
});
// export const {refreshAdminGetUser}=adminGetUsersSlice.actions 

export default adminDeleteUsersSlice.reducer;