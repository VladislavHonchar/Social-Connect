import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId) => {
  try {
    const response = await axios.get(`http://localhost:5000/chat/${chatId}`);
    return response.data.messages;
  } catch (error) {
    console.error(error.message);
    throw Error('Failed to fetch messages');
  }
});

export const addMessage = createAsyncThunk('chat/addMessage', async ({ chatId, sender, textMessage }) => {
  try {
    await axios.put(`http://localhost:5000/chat/${chatId}`, { sender, textMessage }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return { chatId, sender, textMessage };
  } catch (error) {
    console.error(error.message);
    throw Error('Failed to add message');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default chatSlice.reducer;