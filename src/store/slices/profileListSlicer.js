import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, endpoints } from "../../api";

export const getProfileList = createAsyncThunk(
    "musker/profile_list",
    async () => {
        const response = await api.get(endpoints.profileList);
        
        return response.data;
    }
)

export const getProfileDP = createAsyncThunk(
    "musker/profile",
    async (id) => {
        const response = await api.get(endpoints.profileDP + id);
        
        return response.data;
    }
)

export const profileListSlice = createSlice({
    name: "profileList",
    initialState: {
        profileListData: null,
        error: null,
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [getProfileList.pending]: (state) => {
            state.status = "loading";
        }
        ,
        [getProfileList.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.profileListData = action.payload;
        }
        ,
        [getProfileList.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [getProfileDP.pending]: (state) => {
            state.status = "loading";
        }
        ,
        [getProfileDP.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.profileListData = action.payload;
        }
        ,
        [getProfileDP.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }

    }
})

export default profileListSlice.reducer;

