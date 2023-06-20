import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (userId) => {
  const response = await axios.get(`http://localhost:5000/posts/${userId}`);
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addPost } = postSlice.actions;

export const createPost = (userId, formData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/post/${userId}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    dispatch(addPost(response.data));
  } catch (error) {
    console.log(error);
  }
};

export default postSlice.reducer;
