import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFriendsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFriendsSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchFriendsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchFriendsStart, fetchFriendsSuccess, fetchFriendsFailure } = friendsSlice.actions;

export const fetchFriends = (userIds) => async (dispatch) => {
  dispatch(fetchFriendsStart());
  console.log(userIds)

  try {
    const response = await axios.post('http://localhost:5000/getfriends', null, {
      params: { userIds },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch(fetchFriendsSuccess(response.data));
  } catch (error) {
    dispatch(fetchFriendsFailure(error.message));
  }
};

export default friendsSlice.reducer;

