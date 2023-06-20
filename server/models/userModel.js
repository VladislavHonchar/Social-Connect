const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    subscriptions:[String],
    subscribers:[String],
    post: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          photo: {
            type: Buffer,
          },
        },
      ],
      myChats: [
        {
          nameRecipient: {
            type: String,
          },
          idRecipient: {
            type: String
          },
          idChat: {
            type: String,
          },

        },
      ],
    photo: {type: Buffer},
    
})

const User = mongoose.model('User', userSchema);

module.exports = User;