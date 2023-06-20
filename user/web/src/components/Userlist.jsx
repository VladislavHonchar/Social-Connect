import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, addChat, addSubscribe, removeSubscription } from '../store/actions/userActions';
import s from "./style/UserList.module.css"

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const SenderId = localStorage.getItem('userId');
  let mySubscriptions = JSON.parse(localStorage.getItem('mysubscriptions')) || [];
  let myChats = JSON.parse(localStorage.getItem('myChats')) || [];

  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]);

  const handleRemoveSubscription = async (idSub) => {
    setIsLoading(true);
    mySubscriptions = mySubscriptions.filter((sub) => sub !== idSub);
    localStorage.setItem('mysubscriptions', JSON.stringify(mySubscriptions));
    await dispatch(removeSubscription(SenderId, idSub));
    setUpdatedUsers(prevUsers => prevUsers.map(user => {
      if (user._id === idSub) {
        return {
          ...user,
          isSubscribed: false
        };
      }
      return user;
    }));
    setIsLoading(false);
  };

  const handleAddChat = (userId, firstName) => {
    dispatch(addChat(userId, firstName, navigate));
  };

  const handleToggleSubscription = async (userId) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    if (mySubscriptions.includes(userId)) {
      await handleRemoveSubscription(userId);
    } else {
      await handleAddSubscribe(userId);
    }
    setIsLoading(false);
  };

  const handleAddSubscribe = async (idFriend) => {
    setIsLoading(true);
    mySubscriptions.push(idFriend);
    localStorage.setItem('mysubscriptions', JSON.stringify(mySubscriptions));
    await dispatch(addSubscribe(idFriend, SenderId));
    setUpdatedUsers(prevUsers => prevUsers.map(user => {
      if (user._id === idFriend) {
        return {
          ...user,
          isSubscribed: true
        };
      }
      return user;
    }));
    setIsLoading(false);
  };

  const hasSubscription = (userId) => {
    return mySubscriptions.includes(userId);
  };

  const hasChat = (userId) => {
    return myChats.some(chat => chat.idRecipient === userId);
  };

  useEffect(() => {
    if (searchName.length === 0) {
      setUpdatedUsers(users);
    } else {
      const filteredUsers = users.filter(user => user.firstName.toLowerCase().startsWith(searchName.toLowerCase()));
      setUpdatedUsers(filteredUsers);
    }
  }, [searchName, users]);

  const getPhotoUrl = (photo) => {
    const bufferArray = Uint8Array.from(photo.data);
    const blob = new Blob([bufferArray], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <div className={s.main_container}>
      <div className={s.searchContainer}>
      <h2>Список користувачів</h2>
        <input
          type="text"
          placeholder="Введіть ім'я для пошуку"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={s.searchInput}
        />
      </div>
      {updatedUsers.length === 0 ? (
        <p className={s.error_users}>Немає доступних користувачів</p>
      ) : (
        <div className={s.userListContainer}>
          <div className={s.userList}>
            {updatedUsers.map((user) => (
              user._id !== SenderId && (
                <div key={user._id} className={s.userCard}>
                  <h3>{user.firstName} {user.lastName}</h3>
                  {user.photo && (
                    <img className={s.img_users}
                      src={getPhotoUrl(user.photo)}
                      alt={`Photo of ${user.firstName} ${user.lastName}`}
                    />
                  )}
                  <div className={s.box_user_btn}>

                  <button
                    onClick={() => handleAddChat(user._id, user.firstName)}
                    disabled={hasChat(user._id)}
                    className={s.chatButton}
                    >
                    Чат
                  </button>
                  <button
                    onClick={() => handleToggleSubscription(user._id)}
                    disabled={isLoading}
                    className={s.subscriptionButton}
                    >
                    {hasSubscription(user._id) ? 'Відписатися' : 'Підписатися'}
                  </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
