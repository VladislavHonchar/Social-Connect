const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const { secretKey } = require("../config");
const { config } = require("dotenv");
const fs = require('fs');



// const generateAccessToken = (id) => {
//     const payload = {id}
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Помилка при реєстрації', errors: errors.array() });
      }

      const { email, password, firstName, lastName, age } = req.body;
      const photoPath = req.file.path;
      const photoBuffer = fs.readFileSync(photoPath);

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Користувач з такою електронною поштою вже існує' });
      }

      const user = new User({ email, password, firstName, lastName, age, photo: photoBuffer });
      await user.save();

      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '24h' });

      return res.json({
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Помилка при реєстрації' });
    }
  }

  async newPost(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }
      const { id } = req.params;
      const { title, description } = req.body;
      const photoPath = req.file.path; // Отримати шлях до фото
      const photoBuffer = fs.readFileSync(photoPath); // Прочитати фото у форматі buffer
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
  
      const post = { title, description, photo: photoBuffer }; // Створити об'єкт посту з фото
  
      user.post.push(post); // Додати пост до масиву постів користувача
      await user.save();
  
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(408).json({ message: "Registration error" });
    }
  }
  
  

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: `Користувача з такою поштою ${email} не знайдено(` })
      }
      //const validPassword = bcrypt.compareSync(password, user.password)
      if (!password) {
        return res.status(400).json({ message: `Введений пароль є невірним(` })
      }
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "24h" })
      return res.json({
        token,
        id: user.id
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login error' })
    }
  }
  async getUserInfo(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      // Перевірка, чи у користувача є фото
      if (!user.photo) {
        return res.status(404).json({ message: "Фото користувача не знайдено" });
      }

      // Відправка фото як відповідь
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}, 'firstName lastName photo');
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  }
  async findUser(req, res) {
    try {
      const { firstName } = req.body
      const users = await User.find({ firstName });
      if (!users) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  }
  async getPosts (req, res) {
    try {
      const { id } = req.params;
  
      // Find the user by ID and select the 'post' field
      const user = await User.findById(id).select('post');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const posts = user.post; // Retrieve the 'post' array from the user object
  
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async addSubcribe (req, res){
    try{
      const {idFriend, myId} = req.body;
      const mySubscriptions = await User.findById(myId);
      mySubscriptions.subscriptions.push(idFriend);
      await mySubscriptions.save();
      const sub = await User.findById(idFriend);
      sub.subscribers.push(myId);
      await sub.save();
      res.json(mySubscriptions.subscriptions);
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async findUsersByIds(req, res) {
    try {
      const { userIds } = req.query;
      const users = await User.find({ _id: { $in: userIds } });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async getUser (req, res) {
    try{
      const {id} = req.params;
      const user = await User.findById(id);
      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        photo: user.photo,
        post: user.post,
        subscriptions: user.subscriptions,
        subscribers: user.subscribers,
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async  removeSubscription(req, res) {
    const { id, idSub } = req.body; // Отримання id і idSub з запиту
  
    try {
      const user = await User.findById(id); // Знайти користувача за id
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }
  
      // Видалення idSub з масиву subscriptions
      user.subscriptions = user.subscriptions.filter(sub => sub !== idSub);
  
      await user.save(); // Збереження змін у користувача
      const sub = await User.findById(idSub);
      if (!sub) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }
      sub.subscribers = sub.subscribers.filter(Sub => Sub !== id);
      await sub.save();
      return res.json({ message: 'Підписка видалена успішно' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Помилка при видаленні підписки' });
    }
  }

}

module.exports = new authController;