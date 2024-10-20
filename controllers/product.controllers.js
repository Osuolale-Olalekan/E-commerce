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
        res.send({status:true, data})
    })
    .catch((err)=>{
        res.send({status:false, message:'Unable to fetch'})
    })
}


const deleteProduct = (req,res)=>{
        const id = req.params.id;
    
        ProductModel.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                     res.send({ message: 'Product not found' });
                }
                console.log('Product deleted:', data);
                res.send({ message: 'Product deleted successfully' });
            })
            .catch((err) => {
                console.error(err);
                res.send({ message: 'Internal Server Error', error: err.message }); 
            });
            
}

module.exports = { addProduct, allProduct, deleteProduct }