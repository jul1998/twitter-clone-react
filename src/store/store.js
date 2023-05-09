import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlicer';
import profileReducer from './slices/profileListSlicer';


const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;