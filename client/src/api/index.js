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

/* api.interceptors.request.use(
    (config) => {
        const token = document.cookie.split('token=')[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
); */

// AUTH

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

/* // Logout
const handleLogout = async () => {
    try {
        await api.post('/auth/logout');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
        console.error('Çıkış yapılırken hata oluştu:', error);
    }
};
 */
//BOOKS

// Get all books
const getAllBooks = createAsyncThunk(
    "books/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/books');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Kitaplar getirilirken bir hata oluştu'
            );
        }
    }
);

export { userLogin, userRegister, getAllBooks };
