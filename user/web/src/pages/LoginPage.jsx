import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setId } from "../store/slices/photoSlice";
import s from "./stylePages/loginPage.module.css"


const LoginPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);
    const mainUser = useSelector((state) => state.auth.mainUser);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    
        try {
          await dispatch(loginUser(email, password));
          navigate("/");
          window.location.reload();
        } catch (error) {
          // Handle any errors from the loginUser action
          console.error("Login failed:", error);
        }
      };
    return (
        <div className={s.main_container}>
            <h1 className={s.h1_login}>Вітаємо, зайдійть до себе на сторінку</h1>
            <form className={s.form_login} onSubmit={handleLogin}>
                <div>
                <p>Введіть вашу пошту</p>
                <input className={s.mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                <p>Введіть ваш пароль</p>
                <input className={s.pass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className={s.sub} type="submit" disabled={isLoading}>
                    {isLoading ? 'loading...' : 'Login'}
                </button>
            </form>
                {error && <p className={s.error_login}>{error.message}</p>}
            <p>
                Або <Link className={s.link_reg} to="/register">Зареєструйся</Link>
            </p>
        </div>
    );
}

export default LoginPage;




