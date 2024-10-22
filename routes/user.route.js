const express = require('express')
const { registerUser, loginUser, verifyAUth } = require('../controllers/user.controller')
const { deleteProduct } = require('../controllers/product.controllers')
const route = express.Router()

route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/verify-auth', verifyAUth)


module.exports = route