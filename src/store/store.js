import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlicer';
import profileReducer from './slices/profileListSlicer';
import meepsReducer from './slices/meepsSlicer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    meeps: meepsReducer,
  },
});

export default store;