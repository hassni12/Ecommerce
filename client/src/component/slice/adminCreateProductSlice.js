import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const adminCreateProductsApi = createAsyncThunk(
    "createProduct/adminCreateProductsApi",
    async ( rejectWithValue ) => {
        console.log("product id")
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        try {
            const { data } = await axios.post(
                `http://localhost:8000/api/products`,
                {  },
                config
            );
            console.log(data, "axios");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const createProductSlice = createSlice({
    name: "createProduct",
    initialState: {
        newCreatedproduct: [],
        isLoading: false,
        isSuccess: false,
        isError: null,
    },
    reducers: {
        resetAdminCreateProduct: (state, action) => {
            state.newCreatedproduct = [];
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [adminCreateProductsApi.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = null;
        },
        [adminCreateProductsApi.fulfilled]: (state, action) => {
            state.newCreatedproduct = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
        },
        [adminCreateProductsApi.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;

            state.isError = action.payload.message;
        },
    },
});
export const { resetAdminCreateProduct } = createProductSlice.actions

export default createProductSlice.reducer;