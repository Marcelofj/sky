const express = require('express')

const router = express.Router()
const AuthController = require('../controllers/authController')

router.post('/sign-up', AuthController.register)
router.post('/sign-in', AuthController.authenticate)

module.exports = router
