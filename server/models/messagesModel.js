const mongoose = require("mongoose");

let messagesSchema = mongoose.Schema({
    messages:[{
        sender: String,
        recipient: String,
        textMessage: String,
        timestamp: { type: Date, default: Date.now }
    }]
})

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;