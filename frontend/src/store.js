import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'
import contactReducer from './slices/contactSlice';


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer ,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer,
    contactState: contactReducer // Add this line
})


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;