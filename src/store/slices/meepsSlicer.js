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

export const createMeep = createAsyncThunk(
    "meeps/createMeep",
    async (body) => {
        const response = await api.post(endpoints.createMeep, body);
        return response.data;
    }
);

export const likeMeep = createAsyncThunk(
    "meeps/likeMeep",
    async (body) => {
        const response = await api.post(endpoints.meepLikes, body);
        return response.data;
    }
);

export const getMeepLikesCount = createAsyncThunk(
    "meeps/getMeepLikesCount",
    async (data) => {
        
        const response = await api.post(endpoints.meepLikesCount, data);
        
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
        [createMeep.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [createMeep.fulfilled]: (state, action) => {
            state.meeps = action.payload;
            state.status = "success";
        }
        ,
        [createMeep.rejected]: (state, action) => {
            state.status = "failed";
        }
        ,
        [likeMeep.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [likeMeep.fulfilled]: (state, action) => {
            state.meeps = action.payload;
            state.status = "success";
        }
        ,
        [likeMeep.rejected]: (state, action) => {
            state.status = "failed";
        }
        ,
        [getMeepLikesCount.pending]: (state, action) => {
            state.status = "loading";
        }
        ,
        [getMeepLikesCount.fulfilled]: (state, action) => {
            state.meeps = action.payload;
            state.status = "success";
        }
        ,
        [getMeepLikesCount.rejected]: (state, action) => {
            state.status = "failed";
        }
        ,

    }
    ,
});

export default meepsSlicer.reducer;

