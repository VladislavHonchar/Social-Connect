import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationUserAsync } from "../store/slices/registrationSlice";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import s from "./stylePages/RegisterPage.module.css"

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.register.isLoading);
  const error = useSelector((state) => state.register.error);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("photo", photo);

    dispatch(registrationUserAsync(formData));
    navigate('/login');

  };



  return (
    <div className={s.reg_main_contaner}>
      <h1>Реєстрація</h1>
      <form className={s.reg_container} onSubmit={handleRegister}>
        <div>
          <p>Введіть вашу пошту</p>
          <input className={s.reg_email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Введіть ваш пароль</p>
          <input className={s.reg_pass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Введіть ваше ім'я</p>
          <input className={s.reg_firstname}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <p>Введіть вашу фамілію</p>
          <input className={s.reg_lastname}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <p>Введіть ваш вік</p>
          <input className={s.reg_age}
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <label htmlFor="user-photo">
          Додати фото
        <input className={s.reg_photo}
          name="photo"
          id="user-photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        </label>
        <button className={s.reg_sub} type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Реєстрація"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <p>
        Або <Link to="/login">Авторизація</Link>
      </p>
    </div>
  );
}

export default RegisterPage;