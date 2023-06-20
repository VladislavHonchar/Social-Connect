import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/photoSlice';
import { fetchPosts } from '../store/slices/postSlice';
import { Link, useParams } from 'react-router-dom';
import s from './style/UserInfo.module.css';
import NewPostForm from './PostForm';
import Preloader from './Preloader';
import subscriber from "../assets/img/subscriber.png"
import subscription from "../assets/img/subscription.png"


const UserInfo = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post); // Оновлено: використовуйте стан з срезу "post" для постів
  const { id } = useParams();
  const storedUserId = localStorage.getItem('userId');
  const userId = id ? id : storedUserId;

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchPosts(userId)); // Оновлено: отримати пости при завантаженні сторінки
  }, [dispatch, userId]);

  useEffect(() => {
    if (data && data.myChats) {
      localStorage.setItem('myChats', JSON.stringify(data.myChats));
    }

    if (data && data.subscribers) {
      localStorage.setItem('mysubscribers', JSON.stringify(data.subscribers));
    }
    if (data && data.subscriptions) {
      localStorage.setItem('mysubscriptions', JSON.stringify(data.subscriptions));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.firstName) {
      localStorage.setItem('firstName', data.firstName);
    }
  }, [data]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (!data) {
    return null;
  }

  const { firstName, lastName, age, photo, subscriptions, subscribers } = data;

  const bufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const photoData = photo ? `data:image/png;base64,${bufferToBase64(photo.data)}` : null;

  const renderPosts = () => {
    if (posts.length === 0) {
      return <p>Немає доступних постів</p>;
    }
  
    return (
      <div className={s.postContainer}>
        {posts.map((post, index) => (
          <div key={post.id} className={s.postItem} style={{ zIndex: index }}>
            <div className={s.postImageContainer}>
              <div
                className={`${s.postImage} ${s.postImageHover}`}
                style={{ backgroundImage: `url(data:image/png;base64,${bufferToBase64(post.photo.data)})` }}
              ></div>
              <div className={s.postOverlay}>
                <div className={s.postTitle}>{post.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  
  
  
  
  
  
  

  return (
    <div className={s.container}>
      <div className={s.userBox}>
        <div className={s.userPhoto}>
          <img className={s.userPhoto} src={photoData} alt="Фото користувача" />
        </div>
        <div className={s.userInfo}>
          <h2 className={s.userName}>
            {firstName} {lastName}
          </h2>
          <p className={s.userAge}> Вік: {age}</p>
          <div className={s.link_container}>
            <div className={s.link_box}>
              <img className={s.subscribers} src={subscription} alt="" />
              <Link className={s.link} to={`/mysubscribe?subscribers=${encodeURIComponent(JSON.stringify(subscriptions))}`}>
                Підписки {subscriptions.length}
              </Link>
            </div>
            <div className={s.link_box}>
              <img className={s.subscribers} src={subscriber} alt="" />
              <Link className={s.link} to={`/mysubscribe?subscribers=${encodeURIComponent(JSON.stringify(subscribers))}`}>
                Підписники {subscribers.length}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {userId === storedUserId && <NewPostForm />}
      <div>
        {renderPosts()}
      </div>
    </div>
  );
};

export default UserInfo;
