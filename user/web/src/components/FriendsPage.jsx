import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from '../store/slices/friendsSlice';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Preloader from './Preloader';
import s from "./style/friendsPage.module.css";


const FriendsList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.friends);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subscribers = JSON.parse(decodeURIComponent(queryParams.get('subscribers')));
    dispatch(fetchFriends(subscribers));
  }, [dispatch, location]);

  const handleUserClick = (userId) => {
    navigate(`/userinfo/${userId}`);
  };

  if (loading) {
    return <Preloader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={s.main_container}>
      <h2>Список користувачів</h2>
      {users.length === 0 ? (
        <p className={s.error_friends}>Список пустий :</p>
      ) : (
        <div className={s.friendsListContainer}>
          {users.map((user) => (
            <div className={s.friendsCard} key={user._id} onClick={() => handleUserClick(user._id)}>
              <div>
                {user.photo && user.photo.type === 'Buffer' ? (
                  <img
                    src={`data:image/jpeg;base64,${arrayBufferToBase64(user.photo.data)}`}
                    alt="Фото"
                  />
                ) : (
                  <p>Фото недоступне</p>
                )}
              </div>
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
};

export default FriendsList;