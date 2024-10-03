const express = require('express')
const { addProduct, allProduct } = require('../controllers/product.controllers')

const route = express.Router()



route.post('/add-product', addProduct)

route.get('/all-product', allProduct)

module.exports = route