import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      });
  },
});

export const { setId } = userSlice.actions;

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await axios.get(`http://localhost:5000/userinfo/${userId}`);
  return response.data;
});

export default userSlice.reducer;