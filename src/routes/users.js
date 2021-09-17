const express = require('express')

const router = express.Router()
const UsersController = require('../controllers/usersController')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('/search-user/:id', AuthMiddleware, UsersController.show)

module.exports = router
