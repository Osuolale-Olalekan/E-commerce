const express = require('express')
const { addProduct, allProduct, deleteProduct, editProduct } = require('../controllers/product.controllers')
const { verifyAUth } = require('../controllers/user.controller')

const route = express.Router()



route.post('/add-product',verifyAUth, addProduct)

route.get('/all-product', verifyAUth, allProduct)

route.delete('/delete-product/:id', verifyAUth, deleteProduct)

route.patch('/edit-product/:id',verifyAUth, editProduct)

module.exports = route