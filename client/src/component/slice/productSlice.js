import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productList = createAsyncThunk(
  "product/productList",
  async () => {
    const {data} = await axios.get("http://localhost:8000/api/products");
    console.log(data,"axios")
    return data;
  });

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],    
    isLoading: false,
    isError: null,
  },
  extraReducers: {
    [productList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError=null
    },
    [productList.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    [productList.rejected]: (state, action) => {
      state.isError = action.payload
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
