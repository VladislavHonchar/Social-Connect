const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {type: Buffer},

})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;