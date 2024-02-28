const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user/:id', userController.getUser);
router.post('/add-user', userController.addUser);
router.post('/login', userController.login);
router.put('/edit-user/:id', userController.editUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;