const express = require('express');
const controller = require("../controllers/api-messages-controller");
const {check} = require("express-validator");

const router = express.Router();


router.post("/chat/new", controller.newChat);
router.put("/chat/register", controller.addChat);
router.put("/chat/:id", controller.addMessages);
router.get("/chat/:id", controller.getMessages);

module.exports = router;