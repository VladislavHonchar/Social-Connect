import React from 'react'
import UserInfo from '../components/UserInfo';
import Navbar from '../components/Navbar';
import NewPostForm from '../components/PostForm';
// import UserPosts from '../components/UserPost';
import s from "./stylePages/Homepage.module.css"
import {Routes, Route} from 'react-router-dom';

const HomePage = () => {

  return (
    <div className={s.container}>
      <div className={s.navContainer}>
       
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  );
};


export default HomePage;


