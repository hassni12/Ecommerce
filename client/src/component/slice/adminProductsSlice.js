import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const adminGetProductByIdApi = createAsyncThunk(
  "product/adminGetProductByIdApi",
  async (id,{rejectWithValue}) => {
    console.log(id,"deleted product id")
   const userInfo= JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/products/${id}`,
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminProductUpdateApi = createAsyncThunk(
  "product/adminProductUpdateApi",
  async ({id ,name, image, brand, description, category, countInStock, price},{rejectWithValue}) => {
    console.log(id,"deleted product id")
   const userInfo= JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        {id ,name, image, brand, description, category, countInStock, price},
        config
      );
      console.log(data, "axios");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminDeleteProductsSlice = createSlice({
  name: "product",
  initialState: {
    adminProduct: [],
    adminProductUpdate: [],
    isLoading: false,
    isSuccess:false,
    isError: null,
  },
  reducers: {
resetAdminProduct: (state, action) => {
    // state.adminProduct=[];
    state.adminProductUpdate= [];
    state.isSuccess=false;


}

  },
  
  extraReducers: {
    [adminGetProductByIdApi.pending]: (state, action) => {
      state.isLoading=true;
      state.isSuccess=false;
      state.isError=null;
    },
    [adminGetProductByIdApi.fulfilled]: (state, action) => {
      state.adminProduct = action.payload;
      state.isSuccess=true;
      state.isLoading = false;
    },
    [adminGetProductByIdApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess=false;
      console.log(action.payload)
      state.isError = action.payload.message;
    },
    [adminProductUpdateApi.pending]: (state, action) => {
      state.isLoading=true;
      state.isSuccess=false;
      state.isError=null;
    },
    [adminProductUpdateApi.fulfilled]: (state, action) => {
      state.adminProductUpdate = action.payload;
      state.isSuccess=true;
      state.isLoading = false;
    },
    [adminProductUpdateApi.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess=false;
      console.log(action.payload)
      state.isError = action.payload.message;
    },
  },
});
export const {resetAdminProduct}=adminDeleteProductsSlice.actions 

export default adminDeleteProductsSlice.reducer;