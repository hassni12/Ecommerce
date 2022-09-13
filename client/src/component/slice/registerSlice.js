import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { authUser } from "./userSlice";
// authUser
export const registerUser = createAsyncThunk(
  "userInfo/registerUser",
  async ({ name, email, password }, { rejectWithValue ,dispatch}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/register",
        { name, email, password },
        config
      );
      dispatch(authUser({email,password}))
      console.log(data, "axios");
      return data;
    } catch (error) {
    
        return rejectWithValue(error.response.data);
      
    }
  }
);

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const registerSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: userFromLocalStorage,
    isLoading: false,
    isError: null,
  },reducers:{
    removeRegisterInformation:(state, action)=>{
      state.userInfo=null
    }

  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      toast.success(`${action.payload.name} register successfull`);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));

      state.isLoading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});
export const {removeRegisterInformation}=registerSlice.actions
export default registerSlice.reducer;
