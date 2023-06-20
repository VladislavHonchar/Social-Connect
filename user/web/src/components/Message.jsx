import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchMessages, addMessage } from '../store/slices/messagesSlice';
import back from "../assets/img/4829870_arrow_back_left_icon.png"
import s from "./style/messages.module.css"
import send from  "../assets/img/free-icon-send-button-60525.png"



const ChatPage = () => {
  const location = useLocation();
  const { chatId, name } = location.state || {};
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const senderId = localStorage.getItem('userId');

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const textMessage = event.target.message.value;
    const sender = senderId;
    dispatch(addMessage({ chatId, sender, textMessage }));
    event.target.reset();
  };

  return (
    <div className={s.main_container}>
      <div className={s.header}>
        <Link to="/"><img src={back} alt="" /></Link>
        <p className={s.head_name}>Чат з {name}</p>
      </div>
      {messages.length === 0 ? (
        <p className={s.not_messages}>Немає повідомлень у цьому чаті</p>
      ) : (
        <div className={s.messages_box}>
          {messages.map((message) => (
            <p className={
              message.sender === senderId ? s.message_sender : s.message_recipient
            } key={message.id}>
              {message.textMessage}
            </p>
          ))}
        </div>
      )}
      <div className={s.submit_box}>
        <form className={s.submit_form} onSubmit={handleMessageSubmit}>
          <input className={s.input_text} type="text" name="message" placeholder="Введіть повідомлення" required />
          <button className={s.sub_btn} type="submit"><img className={s.send_img} src={send} alt="" /></button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;