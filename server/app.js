const mongoose = require("mongoose");
const express = require('express');
const userApiRoutes = require("./routes/users");
const chatApiRoutes = require("./routes/chat")
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))


const PORT = 5000;
const db = 'mongodb+srv://fourcharly:borrow228@diplom.jxtbr9z.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(userApiRoutes);
app.use(chatApiRoutes);