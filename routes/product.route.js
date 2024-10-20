const express = require('express')
const { addProduct, allProduct, deleteProduct } = require('../controllers/product.controllers')

const route = express.Router()



route.post('/add-product', addProduct)

route.get('/all-product', allProduct)

route.delete('/delete-product', deleteProduct)

module.exports = route