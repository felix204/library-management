import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "@/api";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthError, setToken } = authSlice.actions;
export default authSlice.reducer;
