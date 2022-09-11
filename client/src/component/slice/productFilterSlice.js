import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productFilterById = createAsyncThunk(
  "productFilter/productFilterById",
  async (id) => {
    const {data} = await axios.get(`http://localhost:8000/api/products/${id}`);
    console.log(data,"axios")
    return data;
  });

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState: {
    productFilter: [],    
    isLoading: false,
    isError: null,
  },
  extraReducers: {
    [productFilterById.pending]: (state, action) => {
      state.isLoading = true;
      state.isError=null
    },
    [productFilterById.fulfilled]: (state, action) => {
      state.productFilter = action.payload;
      state.isLoading = false;
    },
    [productFilterById.rejected]: (state, action) => {
      state.isError = action.payload
      state.isLoading = false;
    },
  },
});

export default productFilterSlice.reducer;
