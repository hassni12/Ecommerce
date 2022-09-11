import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const profileUpdatedApi = createAsyncThunk(
  "profile/profileUpdatedApi",
  async (
    { _id, name, email, password },
    { rejectWithValue, dispatch, getState }
  ) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log(userInfo, getState(), "getUser profile");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/users/profile`,
        { _id, name, email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      //   dispatch(authUser({email,password}))
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {},
    isLoading: false,
    isError: null,
    isSuccess: null,
  },
  extraReducers: {
    [profileUpdatedApi.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [profileUpdatedApi.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = "Profile updated successfully";
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    [profileUpdatedApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});

export default getProfileSlice.reducer;
