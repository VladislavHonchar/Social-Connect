const mongoose = require("mongoose");
require('dotenv').config({ path: 'env/.env' });

const dev_db_url = 'mongodb+srv://fourcharly:borrow228@diplom.jxtbr9z.mongodb.net/?retryWrites=true&w=majority';
const mongoDB_URL = process.env.MONGO_URL || dev_db_url;
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};

const connectDB = async () => {
    try {
     await mongoose.connect(mongoDB_URL, dbOptions);
    } catch (error) {
        console.error("Could not Connect to Database", error)
    }
};
module.exports = connectDB;