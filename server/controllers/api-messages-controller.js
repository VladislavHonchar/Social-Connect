const Message = require("../models/messagesModel");
const User = require("../models/userModel")
const { validationResult } = require('express-validator')


class MessageController {
    async newChat(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ message: "Помилка при реєстрації", errors });
            }
            const chat = new Message({});
            await chat.save();
            return res.json({ message: "Чат успішно створений", id: chat._id });
          } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Помилка при створенні чату" });
          }
    };
    async addChat(req, res) {
        try {
          const { idSender, idRecipient, idChat, nameSender, nameRecipient } = req.body;
          const sender = await User.findByIdAndUpdate(idSender, {
            $push: { myChats: { nameRecipient, idRecipient, idChat } },
          });
          await sender.save();
      
          const recipient = await User.findByIdAndUpdate(idRecipient, {
            $push: { myChats: { nameRecipient: nameSender, idRecipient: idSender, idChat } },
          });
          await recipient.save();
      
          return res.json({ message: 'Чат успішно зареєстрований' });
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: 'Помилка при реєстрації чату' });
        }
      }
    async addMessages(req, res) {
        try {
            const { id } = req.params;
            const { sender, textMessage } = req.body;
        
            const messages = await Message.findByIdAndUpdate(id, {
              $push: { messages: { sender, textMessage } },
            });
            return res.json(messages);
          } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Помилка при реєстрації' });
          }
    }
    async getMessages(req, res) {
        try{
            const {id} = req.params;
            const message = await Message.findById(id);
            return res.json(message);
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Помилка при реєстрації'})
        }
    }
}

module.exports = new MessageController;