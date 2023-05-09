import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, endpoints } from "../../api";

export const registerUser = createAsyncThunk(
    "accounts/register",
    async (userData) => {
        const response = await api.post(endpoints.register, userData);
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    "accounts/login",
    async (userData) => {
        const response = await api.post(endpoints.login, userData);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
)

export const logoutUser = createAsyncThunk(
    "accounts/logout",
    async () => {
        const response = await api.post(endpoints.logout);
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        return response.data;
    }
)


export const userSheetSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        error: null,
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.status = "loading";
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.userData = action.payload;
        },
        [registerUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [loginUser.pending]: (state) => {
            state.status = "loading";
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.userData = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default userSheetSlice.reducer;
