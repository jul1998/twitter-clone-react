import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, endpoints } from "../../api";

export const getMeeps = createAsyncThunk(
    "meeps/getMeeps",
    async () => {
        const response = await api.get(endpoints.getMeeps);
        return response.data;
    }

);

export const getMeepByUserID = createAsyncThunk(
    "meeps/getMeepByUserID",
    async (id) => {
        const response = await api.get(endpoints.getMeeps + id);
        return response.data;
    }

);

export const meepsSlicer = createSlice({
    name: "meeps",
    initialState: {
        meeps: [],
        status: null,
    },
    extraReducers: {
        [getMeeps.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [getMeeps.fulfilled]: (state, action) => {
            state.meeps = action.payload;
            state.status = "success";
        }
        ,
        [getMeeps.rejected]: (state, action) => {
            state.status = "failed";
        }
        ,
        [getMeepByUserID.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [getMeepByUserID.fulfilled]: (state, action) => {
            state.meeps = action.payload;
            state.status = "success";
        }
        ,
        [getMeepByUserID.rejected]: (state, action) => {
            state.status = "failed";
        }
        ,
        
    }
    ,
});

export default meepsSlicer.reducer;

