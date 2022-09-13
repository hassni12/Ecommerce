import { configureStore } from "@reduxjs/toolkit";
// import thunk from 'redux-thunk'
import productReducer from "./component/slice/productSlice";
import productFilterSlice from "./component/slice/productFilterSlice";
import addToCartReducer from "./component/slice/cartSlice";
import registerReducer from "./component/slice/registerSlice";
import userReducer from "./component/slice/userSlice";
import userProfileReducer from "./component/slice/getUserProfileSlice";
import orderCreateReducer from "./component/slice/orderSlice";
import orderDetailsReducer from "./component/slice/orderGetSlice";
import orderPayReducer from "./component/slice/orderPaySlice";
import myOrderReducer from "./component/slice/myOrderListSlice";
import  adminUsersListReducer from "./component/slice/adminUserGetSlice";
import adminUserDeleteReducer from "./component/slice/adminUserDeleteSlice";
// adminUserDeleteSlice
import adminUserGetAndUpdateByIdReducer from "./component/slice/adminUserGetByIdSlice";
import adminDeleteProductsReducer from "./component/slice/adminProductsSlice"
export const store = configureStore({
  reducer: {
    productList: productReducer,
    productFilter: productFilterSlice,
    cart: addToCartReducer,
    loginUser: userReducer,
    registerUser: registerReducer,
    userDetails: userProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrder:myOrderReducer,
    adminUsersList:adminUsersListReducer,
    deletedUsers:adminUserDeleteReducer,
    getAndUpdateUserInAdmin:adminUserGetAndUpdateByIdReducer,
    adminProduct:adminDeleteProductsReducer
  },
});
