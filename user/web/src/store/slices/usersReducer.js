const initialState = {
    users: [],
    chatId: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERS':
        return {
          ...state,
          users: action.payload,
        };
      case 'SET_CHAT_ID':
        return {
          ...state,
          chatId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;