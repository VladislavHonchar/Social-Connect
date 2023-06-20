import axios from 'axios';

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      dispatch(setUsers(users));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    payload: users,
  };
};

export const addChat = (userId, firstName, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/chat/new');
      const newChatId = response.data.id;
      const nameRecipient = firstName;
      await registerChat(newChatId, userId, nameRecipient);
      dispatch(setChatId(newChatId));
      navigate(`/chat/${userId}`, { state: { chatId: newChatId } });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const registerChat = async (chatId, userId, nameRecipient) => {
  const SenderId = localStorage.getItem('userId');
  const NameSender = localStorage.getItem('firstName');
  try {
    await axios.put('http://localhost:5000/chat/register', {
      idSender: SenderId,
      idRecipient: userId,
      idChat: chatId,
      nameRecipient: nameRecipient,
      nameSender: NameSender,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Чат успішно зареєстровано');
  } catch (error) {
    console.error(error.message);
  }
};

export const setChatId = (chatId) => {
  return {
    type: 'SET_CHAT_ID',
    payload: chatId,
  };
};

export const addSubscribe = (idFriend, SenderId) => {
  return async (dispatch) => {
    try {
      await axios.put('http://localhost:5000/addsubcribe', {
        idFriend,
        myId: SenderId,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};
export const removeSubscription = (id, idSub) => {
    return async (dispatch) => {
      try {
        await axios.put(
          'http://localhost:5000/removesubscription',
          { id, idSub },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log('Підписка видалена успішно');
      } catch (error) {
        console.error(error.message);
      }
    };
  };