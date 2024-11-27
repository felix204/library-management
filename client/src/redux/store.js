import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/redux/slice/authSlice';
import userReducer from '@/redux/slice/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export default store;