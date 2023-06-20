import React from "react";
import s from "./style/NavBar.module.css"
import { Link, useNavigate} from "react-router-dom";
import user from "../assets/img/free-icon-font-user-3917711.png"
import chat from "../assets/img/free-icon-font-envelope-3916631.png"
import people from "../assets/img/free-icon-font-users-alt-5069169.png"
import logo from "../assets/img/2-6C7EfVXKa-transformed.png"
import logout from "../assets/img/logout.png"
import MyChats from "./MyChats";


const Navbar = () =>{
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();

    function logOut (){
        localStorage.clear();
        navigate('/login');
        window.location.reload()
    }
    return (
        <div className={s.overlay}>
            <div >
                <img className={s.logo} src={logo} alt="" />
            </div>
            <Link className={s.content} to={`/userinfo/${userId}`}> <img className={s.icon} src={user} alt="" />Профіль</Link>
            <Link className={s.content} to="/users"> <img className={s.icon} src={people} alt="" />Усі користувачі</Link>
            <div className={s.chats}>
            <MyChats/>
            </div>
            <div>
                <img onClick={logOut} className={s.logout_img} src={logout} alt="" />
            </div>
        </div>
    );
}

export default Navbar;