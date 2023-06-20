import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';
import registrationReducer from './slices/registrationSlice';
import photoReducer from './slices/photoSlice';
import postReducer from './slices/postSlice';
import friendsReducer from './slices/friendsSlice';
import chatReducer from './slices/messagesSlice';
import userReducer from './slices/usersReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registrationReducer,
    user: photoReducer,
    post: postReducer,
    friends: friendsReducer,
    chat: chatReducer,
    users: userReducer,
  },
});