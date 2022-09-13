import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const adminUserGetByIdApi = createAsyncThunk(
    "AdminUserById/adminUserGetByIdApi",
    async ( id , { rejectWithValue }) => {
        console.log(id,"admin user getByIdApi")
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
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
export const adminUserUpdateByIdApi = createAsyncThunk(
    "AdminUpdateUserById/adminUserUpdateByIdApi",
    async ({ id, name, email, isAdmin }, { rejectWithValue }) => {
        console.log(id, name, email, isAdmin )
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/users/admin/${id}`,
                { name, email, isAdmin },
                config
            );
            console.log(data, "axios");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminUserGetAndUpdateByIdSlice = createSlice({
    name: "AdminUpdateUserById",
    initialState: {
        user: {},
        updateUser:{},
        isLoading: false,
        isSuccess:false,
        isError: null
    },
    reducers:{
        refreshAdminGetUser: (state, action) => {
            // state.user={};
            state.updateUser={};
            state.isSuccess=false
        }
    },

    extraReducers: {
        [adminUserGetByIdApi.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = null;
        },
        [adminUserGetByIdApi.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        [adminUserGetByIdApi.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload.message;
        },
        [adminUserUpdateByIdApi.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess=false;
            state.isError = null;
        },
        [adminUserUpdateByIdApi.fulfilled]: (state, action) => {
            state.userUpdate=action.payload;
            state.isLoading=false;
           state.isSuccess=true;
        },
        [adminUserUpdateByIdApi.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess=false;
            state.isError = action.payload.message;
        },
    },
});
export const {refreshAdminGetUser}=adminUserGetAndUpdateByIdSlice.actions
export default adminUserGetAndUpdateByIdSlice.reducer;