import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const authUser = createAsyncThunk(
  "userInfo/authUser",
  async ({ email, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        config
      );

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
const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: userFromLocalStorage,
    isLoading: false,
    isError: null,
  },

  reducers: {
    logout: (state, action) => {
      state.userInfo = localStorage.removeItem("userInfo");
      toast.success(`Logout successfull`);

    },
  },
  extraReducers: {
    [authUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [authUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      toast.success(`${action.payload.name} Login successfull`);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));

      state.isLoading = false;
    },
    [authUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
