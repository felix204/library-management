import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "@/api";

const initialState = {
    loading: false,
    error: null,
    registrationSuccess: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        resetRegistration: (state) => {
            state.registrationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.loading = false;
                state.registrationSuccess = true;
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUserError, resetRegistration } = userSlice.actions;
export default userSlice.reducer;
