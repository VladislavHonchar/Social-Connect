import React from 'react';
import gifImage from '../assets/gif/giphy.gif';
import s from "./style/UserInfo.module.css"

const Preloader = () => {
  return (
    <div className={s.preloader}>
      <img className={s.img_preloader} src={gifImage} alt="GIF" />
    </div>
  );
};

export default Preloader;