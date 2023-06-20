import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, fetchPosts } from '../store/slices/postSlice';
import s from './style/postForm.module.css';
import add from "../assets/img/4781840_+_add_circle_create_expand_icon.png"
import back from "../assets/img/4829870_arrow_back_left_icon.png"

const NewPostForm = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', photo);

    await dispatch(createPost(userId, formData));

    setTitle('');
    setPhoto(null);

    dispatch(fetchPosts(userId));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {!showForm && (
        <img className={s.btn_showForm} onClick={toggleForm} src={add} alt="" />
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className={`${s.main_container} ${s.visible}`}>
            <div className={s.arrow_back}>
            <img className={s.btn_cancel} onClick={toggleForm} src={back} alt="" />
            </div>
          <input
            className={s.title}
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="myFile">
            <span>Додати фото</span>
            <input
              type="file"
              className={s.file}
              id="myFile"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
          <button className={s.btn_sub} type="submit">
            Створити пост
          </button>
          
        </form>
      )}
    </div>
  );
};

export default NewPostForm;
