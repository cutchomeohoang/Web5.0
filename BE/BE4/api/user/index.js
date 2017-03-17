var express = require('express');
var router = express.Router();
var controller = require('./user.controller.js');
router.get('/get', controller.getUser);
router.post('/add', controller.addUser);
router.put('/edit', controller.editUser);
router.delete('/delete', controller.deleteUser);
module.exports = router;