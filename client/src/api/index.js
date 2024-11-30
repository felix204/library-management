import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Axios instance 
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Login
const userLogin = createAsyncThunk(
    "auth/login", 
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Giriş işlemi başarısız'
            );
        }
    }
);

// Register
const userRegister = createAsyncThunk(
    "auth/register", 
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Kayıt işlemi başarısız'
            );
        }
    }
);

export { userLogin, userRegister };
