const express = require('express');
const controller = require("../controllers/api-user-controller");
const {check} = require("express-validator");
const uploadMiddleware = require('../middleware/uploadMiddleware')


const router = express.Router();


router.post("/registration", uploadMiddleware.single('photo'), [
    check('email', "Пошта не може бути пуста").notEmpty(),
    check('password', "Пароль повинен бути більше 4 і менше 12 символів").isLength({min:4, max:12})
], controller.registration);
router.post("/login", controller.login);
router.put("/post/:id", uploadMiddleware.single('photo'), controller.newPost);
router.get('/userinfo/:id', controller.getUserInfo);
router.get('/users', controller.getAllUsers);
router.get('/findUser', controller.findUser);
router.get('/posts/:id', controller.getPosts);
router.put('/addsubcribe', controller.addSubcribe);
router.post('/getfriends', controller.findUsersByIds);
router.post('/user/:id', controller.getUser);
router.put('/removesubscription', controller.removeSubscription)

module.exports = router;