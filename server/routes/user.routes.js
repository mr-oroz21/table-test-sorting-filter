const Router = require('express');
const router = new Router();
const UserController = require('../controller/user.controller');

router.post('/user', UserController.createUser)
router.get('/user', UserController.getUsers)

module.exports = router