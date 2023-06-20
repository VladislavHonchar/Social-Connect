import React from 'react';
import s from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserList from './components/Userlist';
import ChatPage from './components/Message';
import MyChats from './components/MyChats';
import FriendsList from './components/FriendsPage';
import Navbar from './components/Navbar';

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <div className={s.container}>
      {userId && 
      <div className={s.navigate}>
        <Navbar />
      </div>
        }
      <div className={s.info}>
        <Routes>
          {userId ? (
            <Route path='/' element={<HomePage />} />
          ) : (
            <Route path="/login" element={<LoginPage />} />
          )}
          <Route path='/userinfo/:id' element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/mychats" element={<MyChats />} />
          <Route path="/mysubscribe" element={<FriendsList />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
