import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from "./style/myChats.module.css"
import chat from "../assets/img/free-icon-font-envelope-3916631.png"


const MyChats = () => {
  const [chatsData, setChatsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Отримати дані чатів з localstorage під час завантаження сторінки
    const storedChatsData = JSON.parse(localStorage.getItem('myChats'));
    setChatsData(storedChatsData || []); // Initialize with an empty array if storedChatsData is null
  }, []);

  function addChat(idChats, nameRecipient) {
    navigate(`/chat/${idChats}`, { state: { chatId: idChats, name: nameRecipient } });
  }

  return (
    <div className={s.container}>
      {chatsData.length > 0 &&
        chatsData.map((chat, index) => (
          <div className={s.box_btn} key={chat.idChat}>
            <button className={s.chat_btn} onClick={() => addChat(chat.idChat, chat.nameRecipient)}>
              Chat {chat.nameRecipient}
            </button>
          </div>
        ))}
    </div>
  );
};

export default MyChats;
