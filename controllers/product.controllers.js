const express = require('express')
const { ProductModel } = require('../models/product.model')

const addProduct = (req,res)=>{
    const { title, price, description, image, quantity } = req.body

    const product = new ProductModel({
        title,
        price,
        description,
        image,
        quantity
    })

    product.save()
    .then((data)=>{
        res.send({status:true, message:data})
    })
    .catch((err)=>{
        res.send({status:false, message:err})
    })

}

const allProduct = (req,res)=>{
    ProductModel.find()
    .then((data)=>{
        res.send({status:false, data})
    })
    .catch((err)=>{
        res.send({status:false, message:'Unable to fetch'})
    })
}


module.exports = { addProduct, allProduct }